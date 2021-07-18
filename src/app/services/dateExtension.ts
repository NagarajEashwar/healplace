export { } // to make it a module

declare global { // to access the global type String
  interface Date {
      addDays(days: number): Date;
  }
}

// then the actual code
Date.prototype.addDays = function(days){
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};