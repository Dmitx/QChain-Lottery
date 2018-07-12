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
import {q_abi} from './js/contract.js';
import './js/actions.js';
import './style/bootstrap.min.css';
import './js/bootstrap.min.js';
// Template.LotteryList.helpers({
//   get_lottery_list:function(){
//     return
//   }
// });
// app.r2ls.ru:8080/api/lottery-list
// app.r2ls.ru:8080/api/lottery-create

Template.LotteryList.onCreated(function(){
  var template = this;

  HTTP.call('GET', 'http://app.r2ls.ru:8080/api/lotteries', function(err,result){
    let lottery_list = JSON.parse(result.content);
    $('table.LotteryList tr td:first').closest('tr').remove();
    let rows = lottery_list.forEach(function(el){
      let row = "<tr data-contract=\"" + el.contract + "\"><td>" + el.title + "</td><td>" + el.fund
      + "</td><td>" + el.price + "</td><td>" + el.date_end
      + "</td><td><a href='#' class='btn btn-success ajax buy-ticket'>Buy</a></td><td>"
      + "<a href='#' class='btn btn-info ajax show-winners'>Show</a></td></tr>";
      $('table.LotteryList').append(row);
    });
    TemplateVar.set(template, "lottery_list", rows);
  });
});

Template.LotteryCreate.events({
  'click button'(event, instance) {
    let template = Template.instance();
    // content: JSON.stringify({
    // "user_hash": $('input.lottery-title').val(),
    // "transaction_hash": $('input.lottery-title').val(),
    // })
    let lottery = {
        "title": $('input.lottery-title').val(),
        "date_end": $('input.date-end').val(),
        "description": $('textarea').text(),
        "winner_count": $('input.winner-count').val(),
        "gain": $('input.gain').val(),
        "price": $('input.price').val(),
        "picture": $('input.lottery-title').val()
    };
    web3.eth.getAccounts(function(err, res){
      lottery.user_hash = res[0];
      lottery.transaction_hash = res[0];
      // content: JSON.stringify(lottery),
      // let data = {
      //   content: JSON.stringify(lottery)
      // };
      var myContract = web3.eth.contract(q_abi);
      myContract.deploy({
        data: q_bin,
        arguments: [
          lottery.title,
          lottery.price,
          lottery.date_end,
          lottery.winner_count,
          lottery.gain
        ]
      }).then(function(newContractInstance){
        lottery.transaction_hash = newContractInstance.options.address;
        let data = {
          content: JSON.stringify(lottery)
        };
        HTTP.post('http://app.r2ls.ru:8080/api/lotteries', data, function(err,result){
          console.log(result);
        });
          console.log(newContractInstance.options.address) // instance with the new contract address
      });
    });
  }
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
