import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Navbar } from './import/header.html';
import { Footer } from './import/Footer.html';
import { AboutArticle } from './import/AboutArticle.html'
import { LotterySet } from './import/LotterySet.html'
import { LotteryTotalInfo } from './import/LotteryTotalInfo.html'
import { LotteryCreate } from './import/LotteryCreate.html'
import { LotteryContent } from './import/LotteryContent.html'
import { LotteryList } from './import/LotteryList.html'

import { LotteryListActivePage } from './pages/LotteryListActivePage.html'
import { MainPage } from './pages/MainPage.html'



import './main.html';
import './style/bootstrap.min.css';
import './js/bootstrap.min.js';
// Template.LotteryList.helpers({
//   get_lottery_list:function(){
//     return
//   }
// });
Template.LotteryList.onCreated(function(){
  var template = this;
  let test_list = [
    {"title":"Test 1","picture":"/img/lot_1.jpg","fund":"100","price":"1","date_end":"12-07-2018 22:00:00"},
    {"title":"Test 1","picture":"/img/lot_1.jpg","fund":"100","price":"1","date_end":"12-07-2018 22:00:00"},
  ];
  TemplateVar.set(template, "lottery_list", "sdfgdfg");

  HTTP.call('GET', '/test/lottery-list.json', function(err,result){
    let lottery_list = JSON.parse(result.content).lottery_list;
    $('table.LotteryList tr td:first').closest('tr').remove();
    let rows = lottery_list.forEach(function(el){
      let row = "<tr><td>" + el.title + "</td><td>" + el.fund
      + "</td><td>" + el.price + "</td><td>" + el.date_end + "</td></tr>";
      $('table.LotteryList').append(row);
    });
    TemplateVar.set(template, "lottery_list", rows);
  });
});

// Template.MainContent.onCreated(function helloOnCreated() {
//     // counter starts at 0
//     this.page = new ReactiveVar(0);
// });


// Template.MainContent.drawPage = function () {
//     return "Test";
// };
// Template.MainContent.helpers({
//     drawPage:function () {
//         return "Test";
//         // return Template.MainPage;
//         // let page =  Template.instance().counter.get();
//         // if(page == 0)
//         //     return Template.MainPage;
//         // else return Template.LotteryListActivePage;
//     }
// });
// import './style/style.import.less';
