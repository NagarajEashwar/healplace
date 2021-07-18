import { Component, OnInit, AfterViewChecked, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Conversations from '@twilio/conversations';
import { ChatService } from '../../../services/ChatService';
import * as RecordRTC from 'recordrtc';
import { GeneralService } from '../../../services/GeneralService';
import { DeleteChatComponent } from '../delete-chat/delete-chat.component';
import { Router } from '@angular/router';
import { ReportPractitionerComponent } from '../../practitioner-pages/practitioner-chat/report-practitioner/report-practitioner.component';
import { BlockCustomerComponent } from '../block-customer/block-customer.component';
import { SwitchPractitionerComponent } from '../../practitioner-pages/practitioner-chat/switch-practitioner/switch-practitioner.component'
import { NgbdModalContent } from '../customer-booking/ngbdmodalcontent.component';
import { FollowUpFormComponent } from '../../practitioner-pages/practitioner-chat/follow-up-form/follow-up-form.component';

@Component({
  selector: 'app-customer-chat',
  templateUrl: './customer-chat.component.html',
  styleUrls: ['./customer-chat.component.scss']
})
export class CustomerChatComponent implements OnInit {
  model: any;
  isContent: any;
  @ViewChild('ChartRemoveConfirmModal') ChartRemoveConfirmModal: TemplateRef<any>;
  @ViewChild('chatScrollContainer') private chatScrollContainer: ElementRef<any>;
  @ViewChild('practitionerPopTemplate') practitionerPopTemplate: TemplateRef<any>;
  message: any = '';
  userData: any;
  selectedMsg: any;
  client: any;
  channel: any;
  messageData: any = [];
  showEmojiPopup: boolean = false;
  recorder: any;
  blobUrl: any;
  stream: any;
  isRecording: boolean = false;
  isLoading: boolean = false;
  isTyping: boolean = false;
  hiveredMsgId;
  practitionerList: any = [];
  customerList: any = [];
  selectedUser: any;

  constructor(
    private modalService: NgbModal,
    private chatService: ChatService,
    public generalService: GeneralService,
    public router: Router,
  ) {
    // this.message = 'sample'
    // this.emojiSam = emojione.toImage
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    if (this.userData.groups[0] === "Customer") {
      this.getPractitionerList();
      // this.chatService.getCustomerToken().subscribe((succes: any) => {
      //   console.log('sucess', succes);
      //   Conversations.create(succes.token).then((client) => {
      //     console.log('clientclient', client);
      //     this.setupChatClient(client)
      //   }, (err) => {
      //     console.log('create', err);
      //   })
      // }, (err) => {
      //   console.log('err', err);
      // })
    } else if (this.userData.groups[0] === "Practitioner") {
      this.getCustomerList();
      // this.chatService.getPractitionerToken().subscribe((succes: any) => {
      //   console.log('sucess', succes);
      //   Conversations.create(succes.token).then((client) => {
      //     console.log('clientclient', client);
      //     this.setupChatClient(client)
      //   }, (err) => {
      //     console.log('create', err);
      //   })
      // }, (err) => {
      //   console.log('err', err);
      // })
    }
  }

  getChatToken(channelName) {
    if (this.userData.groups[0] === "Customer") {
      this.chatService.getCustomerToken().subscribe((succes: any) => {
        console.log('sucess', succes);
        Conversations.create(succes.token).then((client) => {
          console.log('clientclient', client);
          this.setupChatClient(client, channelName)
        }, (err) => {
          console.log('create', err);
        })
      }, (err) => {
        console.log('err', err);
      })
    } else if (this.userData.groups[0] === "Practitioner") {
      this.chatService.getPractitionerToken().subscribe((succes: any) => {
        console.log('sucess', succes);
        Conversations.create(succes.token).then((client) => {
          console.log('clientclient', client);
          this.setupChatClient(client, channelName)
        }, (err) => {
          console.log('create', err);
        })
      }, (err) => {
        console.log('err', err);
      })
    }
  }

  checkIfChannelExits(data) {
    return new Promise((resolve, reject) => {
      this.chatService.createChannel(data).subscribe((succes: any) => {
        console.log('sucess', succes);
        resolve(succes);
      }, (err) => {
        console.log('err', err);
        reject(err)
      });
    })
  }

  goToChat(list) {
    console.log('listlist', list);
    this.selectedUser = list;
    this.isLoading = true;
    let channelName;
    let data;
    let loggedInData = JSON.parse(localStorage.getItem("logedin_data"));
    console.log('loggedInData', loggedInData);
    this.generalService.setTitle(list.name || list.nick_name);
    if (this.userData.groups[0] === "Customer") {
      channelName = 'ch-' + list.id.split('-')[1] + loggedInData.id.split('-')[1];
      data = {
        "practitioner_id": list.id,
        "isactive": false,
        "sessioninfo": "testing",
        "isblock": false,
        "channelname": channelName,
        "customer": loggedInData.id,
        "parent_id": null
      }
    } else {
      channelName = 'ch-' + loggedInData.id.split('-')[1] + list.id.split('-')[1];
      // channelName = 'ch-' + '372f' + list.id.split('-')[1];
      data = {
        "practitioner_id": loggedInData.id,
        // "practitioner_id": '398ac134-372f-4309-85a3-363c711d52cb',
        "isactive": false,
        "sessioninfo": "testing",
        "isblock": false,
        "channelname": channelName,
        "customer": list.id,
        "parent_id": null
      }
    }
    console.log('channelName', channelName, data, list);
    this.checkIfChannelExits(data)
      .then((res) => {
        console.log('resres', res);
        this.getChatToken(channelName);
      })
      .catch((err) => {
        if (err.status === 400) {
          // this.isLoading = false;
          this.getChatToken(channelName);
        }
        console.log('errerr', err);
      })
  }

  blockUser() {
    const data = {
      channelname: "ch-5e9234bb",
      customer: "607cdc72-34bb-475e-a8a9-cda8ce674837",
      isactive: false,
      isblock: true,
      parent_id: null,
      practitioner_id: "7550544d-5e92-4bb8-bb48-5cb3fd29535c",
      sessioninfo: "testing",
    }
    this.chatService.createChannel(data).subscribe((succes: any) => {
      console.log('sucess', succes);
      // resolve(succes);
    }, (err) => {
      console.log('err', err);
      // reject(err)
    });
  }

  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  openPractitionerPopup(ev) {
    ev.stopPropagation();
    this.modalService.open(this.practitionerPopTemplate, { windowClass: 'modal-practitioner', size: 'md' });
  }

  getPractitionerList() {
    this.chatService.getPractitionerList().subscribe((succes: any) => {
      console.log('getPractitionerList', succes);
      this.practitionerList = succes.data;
      this.practitionerList[0].email = 'suganya.s@aitrg.com';
      this.goToChat(this.practitionerList[0])
    }, (err) => {
      console.log('err', err);
    })
  }

  getCustomerList() {
    this.chatService.getCustomerList().subscribe((succes: any) => {
      console.log('getCustomerList', succes);
      this.customerList = succes.data.response;
      this.customerList[1].email = 'arvind.blues@gmail.com';
      this.goToChat(this.customerList[0])
    }, (err) => {
      console.log('err', err);
    })
  }

  scrollToBottom(): void {
    console.log('scrollToBottomscrollToBottomscrollToBottom');
    try {
      // this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
      this.chatScrollContainer.nativeElement.scroll({
        top: this.chatScrollContainer.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    } catch (err) { }
  }

  setupChatClient(client, channelName) {
    console.log('client', client);
    this.client = client;
    this.client
      .getConversationByUniqueName(channelName)
      .then(channel => channel)
      .catch(error => {
        console.log('error', error, channelName);
        if (error.body.code === 50300) {
          return this.client.createConversation({ uniqueName: channelName });
        } 
      })
      .then(channel => {
        this.channel = channel;
        return this.channel.join().catch(() => { });
      })
      .then(() => {
        console.log('this.channel', this.channel);
        this.isLoading = false;
        // this.setState({ isLoading: false });
        this.channel.getMessages().then(this.messagesLoaded.bind(this));
        this.channel.on('messageAdded', this.messageAdded.bind(this));
        this.channel.on('typingStarted', (participant) => {
          console.log('participant', participant);
          if (participant.identity !== this.userData.user.email) {
            this.isTyping = true;
          }
        });
        this.channel.on('typingEnded', (participant) => {
          console.log('participant', participant);
          if (participant.identity !== this.userData.user.email) {
            this.isTyping = false;
          }
        });
        if (this.channel.createdBy === this.userData.user.email) {
          this.channel.add(this.selectedUser.email);
        }
      })
      .catch(this.handleError.bind(this));
  }

  handleError(error) {
    console.error(error);
    // this.client.conversations.conversations("CHc84a76a904ad43f887326c38c3761921.channel");
    this.isLoading = false;
    // this.setState({
    //   error: 'Could not load chat.'
    // });
  }

  deleteChannel() {
    this.channel.delete();
  }

  getImage(item) {
    // let url = await item.media.getContentTemporaryUrl();
    return item.media.getContentTemporaryUrl().then((url) => {
      // log media temporary URL
      console.log('Media temporary URL is ' + url);
      return url;
    });
  }

  async openFile(item) {
    let url = await item.media.getContentTemporaryUrl();
    window.open(url, "_blank");
  }

  messagesLoaded(messagePage) {
    console.log('messagePage.items', messagePage.items);
    this.messageData = messagePage.items.map((item) => {
      // if (item.type === 'media') {
      //   this.getImage(item)
      //   // item.media.getContentTemporaryUrl().then((url) => {
      //   //   // log media temporary URL
      //   //   console.log('Media temporary URL is ' + url);
      //   //   return {
      //   //     type: item.type,
      //   //     text: item.body,
      //   //     author: { id: item.author, name: item.author },
      //   //     timestamp: item.dateCreated,
      //   //     sid: item.sid,
      //   //     url: url,
      //   //     channel_sid: item.channel.sid
      //   //   }
      //   // });
      // }
      // else {
      return {
        item: item,
        type: item.type,
        text: item.body,
        author: { id: item.author, name: item.author },
        timestamp: item.dateCreated,
        sid: item.sid,
        channel_sid: item.conversation.sid
      }
      // }
    });
    console.log('this.messages', this.messageData);
    this.scrollToBottom();
  }

  messageAdded(message) {
    console.log('new message', message);
    this.messageData.push({
      item: message,
      type: message.type,
      text: message.body,
      author: { id: message.author, name: message.author },
      timestamp: message.dateCreated,
      sid: message.sid,
      channel_sid: message.conversation.sid
    });
    this.scrollToBottom();
    console.log('this.messageData', this.messageData);
  }

  sendMsg() {
    console.log('messa', this.message);
    this.channel.sendMessage(this.message);
    this.message = '';
  }

  selectMsg(message) {
    this.selectedMsg = message;
  }

  deleteMsg() {
    const message = this.selectedMsg;
    console.log('message', message);
    // if (message.author === this.userData.user.email) {
    message.remove().then((success) => {
      console.log('success', success);
      this.channel.getMessages().then(this.messagesLoaded.bind(this));
    }, (err) => {
      console.log('err', err);
    });
    // }
  }

  addEmoji(event) {
    console.log('emoji', event);
    this.message = `${this.message}${event.emoji.native}`;
    this.showEmojiPopup = !this.showEmojiPopup;
  }

  showEmoji() {
    this.showEmojiPopup = !this.showEmojiPopup;
  }


  onFileSelected(event) {

    const file: File = event.target.files[0];

    if (file) {

      const fileName = file.name;

      const formData = new FormData();

      formData.append("file", file);

      console.log('formData', formData);
      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      // upload$.subscribe();
      this.channel.sendMessage(formData);
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      // this.sendMsg();
    } else {
      // else send the Typing Indicator signal
      this.channel.typing();
    }
    // this.channel.on('typingStarted', function(participant) {
    //   console.log('participant', participant);
    // })
  }

  toggleRecord() {
    // if (this.recordingTimer) {
    //   this.stopRTC();
    // } else {
    //   navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    //     this.startRTC(stream);
    //   }).catch(error => {
    //     alert(error)
    //   })
    // }
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      this.startRTC();
    } else {
      this.stopRTC();
    }
  }

  async startRTC() {
    // this.recordWebRTC = new RecordRTC.StereoAudioRecorder(stream, this.options);
    // // this.mediaRecordStream = stream;
    // this.blobUrl = null;
    // this.recordWebRTC.record();
    // this.startCountdown();
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio'
    });
    this.recorder.record();
  }

  stopRTC() {
    this.recorder.stop((blob) => {
      console.log('blobblob', blob);
      const formData = new FormData();

      formData.append("file", blob);

      this.channel.sendMessage(formData);
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }

      // const mp3Name = encodeURIComponent('audio_' + new Date().getTime() + '.mp3');
    });
    // let blob = await this.recorder.getBlob();
    // invokeSaveAsDialog(blob);
    // this.recordWebRTC.stop((blob) => {
    //   //NOTE: upload on server
    //   this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    //   this.startCountdown(true);
    // })
  }

  startCountdown(clearTime = false) {
    // if (clearTime) {
    //   this.clearStream(this.mediaRecordStream);
    //   this.recordWebRTC = null;
    //   this.recordingTimer = null;
    //   this.mediaRecordStream = null;
    //   clearInterval(this.interval);
    //   return
    // } else {
    //   this.recordingTimer = `00:00`;
    //   clearInterval(this.interval);
    // }

    // this.interval = setInterval(() => {
    //   let timer: any = this.recordingTimer;
    //   timer = timer.split(':');
    //   let minutes = +timer[0];
    //   let seconds = +timer[1];

    //   if (minutes == 10) {
    //     this.recordWebRTC.stopRecording();
    //     clearInterval(this.interval);
    //     return
    //   }
    //   ++seconds;
    //   if (seconds >= 59) {
    //     ++minutes;
    //     seconds = 0;
    //   }

    //   if (seconds < 10) {
    //     this.recordingTimer = `0${minutes}:0${seconds}`;
    //   } else {
    //     this.recordingTimer = `0${minutes}:${seconds}`;
    //   }
    // }, 1000);
  }

  clearStream(stream: any) {
    try {
      stream.getAudioTracks().forEach(track => track.stop());
      stream.getVideoTracks().forEach(track => track.stop());
    } catch (error) {
      //stream error
    }
  }
  archiveChat() { }

  reviewPractitioner() { }

  viewSessions() { }

  reviewMe() { }

  bookSession() {
    this.modalService.dismissAll();
    this.modalService.open(NgbdModalContent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', size: 'lg', windowClass: 'customer-booking-modal' });
  }
  switchPractitioner() {
    this.modalService.dismissAll();
    this.modalService.open(SwitchPractitionerComponent, { windowClass: 'modal-remove-chat', size: 'lg' });
  }

  blockCustomer() {
    this.modalService.dismissAll();
    this.modalService.open(BlockCustomerComponent, { windowClass: 'modal-remove-chat', size: 'lg' });
  }

  openFollowUpForm(){
    this.modalService.dismissAll();
    this.modalService.open(FollowUpFormComponent, { windowClass: 'modal-remove-chat', size: 'lg' });
  }

  openModal(modalContent: any, isWhere: string) {
    this.isContent = isWhere;
    this.model = this.modalService.open(modalContent, { size: 'sm' });
  }
  closeModal(Event: any) {
    this.model.close();
  }
  pinMsg() {
    console.log('pinmsg');
    let cols = document.getElementsByClassName('popover') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < cols.length; i++) {
      cols[i].style.display = 'none';
    }
  }
  deleteChat() {
    this.modalService.dismissAll();
    this.modalService.open(DeleteChatComponent, { windowClass: 'modal-remove-chat', size: 'lg' });
  }
  reportPtactitioner() {
    this.modalService.dismissAll();
    this.modalService.open(ReportPractitionerComponent, { windowClass: 'modal-remove-chat', size: 'lg' });
  }
}
