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

// import {q_abi} from './js/contract.js';
// require('./js/contract.js');

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

const q_abi = [
    {
        "constant": false,
        "inputs": [],
        "name": "finishLottery",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "endTime",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "winnersCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "title",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "startTime",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "gainProcent",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "betPeriodhasEnded",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "price",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalRaised",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalTickets",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "lotteryTickets",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "placeBet",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_title",
                "type": "string"
            },
            {
                "name": "_price",
                "type": "uint256"
            },
            {
                "name": "_startTime",
                "type": "uint256"
            },
            {
                "name": "_endTime",
                "type": "uint256"
            },
            {
                "name": "_winnersCount",
                "type": "uint256"
            },
            {
                "name": "_gain",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipRenounced",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    }
];

const q_bin = "60806040526000600a5534801561001557600080fd5b50604051610a79380380610a7983398101604090815281516020830151918301516060840151608085015160a086015160008054600160a060020a03191633179055939095019491929091908383116100cf57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f496e636f727265637420706572696f64206f66206c6f74746572790000000000604482015290519081900360640190fd5b600182101580156100e15750600a8211155b151561017457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f496e636f7272656374206e756d626572206f662077696e6e6572733a2072657160448201527f75697265642066726f6d203120746f2031300000000000000000000000000000606482015290519081900360840190fd5b603281111561020a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f496e636f7272656374206761696e3a2072657175697265642066726f6d20302060448201527f746f203530000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b855161021d906001906020890190610239565b50600294909455600492909255600355600555600655506102d4565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061027a57805160ff19168380011785556102a7565b828001600101855582156102a7579182015b828111156102a757825182559160200191906001019061028c565b506102b39291506102b7565b5090565b6102d191905b808211156102b357600081556001016102bd565b90565b610796806102e36000396000f3006080604052600436106100da5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632c906ba281146100df5780633197cbb6146100f6578063497138111461011d5780634a79d50c14610132578063715018a6146101bc57806378e97925146101d15780638da5cb5b146101e657806396f80aba1461021757806398f79cfd1461022c578063a035b1fe14610255578063c5c4744c1461026a578063dd11247e1461027f578063e74579b114610294578063f2fde38b146102ac578063f90f4560146102cd575b600080fd5b3480156100eb57600080fd5b506100f46102d5565b005b34801561010257600080fd5b5061010b61035d565b60408051918252519081900360200190f35b34801561012957600080fd5b5061010b610363565b34801561013e57600080fd5b50610147610369565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610181578181015183820152602001610169565b50505050905090810190601f1680156101ae5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101c857600080fd5b506100f46103f6565b3480156101dd57600080fd5b5061010b610462565b3480156101f257600080fd5b506101fb610468565b60408051600160a060020a039092168252519081900360200190f35b34801561022357600080fd5b5061010b610477565b34801561023857600080fd5b5061024161047d565b604080519115158252519081900360200190f35b34801561026157600080fd5b5061010b610485565b34801561027657600080fd5b5061010b61048b565b34801561028b57600080fd5b5061010b610491565b3480156102a057600080fd5b506101fb600435610497565b3480156102b857600080fd5b506100f4600160a060020a03600435166104bf565b6100f46104e2565b60008060006102e261047d565b15156102ed57600080fd5b61032660055461031a606461031a60065460640330600160a060020a03163161063c90919063ffffffff16565b9063ffffffff61066b16565b9250600091505b6005548267ffffffffffffffff16101561034c5760019091019061032d565b610357600554610680565b50505050565b60035481565b60055481565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103ee5780601f106103c3576101008083540402835291602001916103ee565b820191906000526020600020905b8154815290600101906020018083116103d157829003601f168201915b505050505081565b600054600160a060020a0316331461040d57600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b60045481565b600054600160a060020a031681565b60065481565b600354421190565b60025481565b60075481565b60085481565b60098054829081106104a557fe5b600091825260209091200154600160a060020a0316905081565b600054600160a060020a031633146104d657600080fd5b6104df816106ce565b50565b60008060045442101580156104f957506003544211155b905080151561050757600080fd5b60025461051b90349063ffffffff61074b16565b9150600082101561058d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6e6f7420656e6f75676820657468657273000000000000000000000000000000604482015290519081900360640190fd5b60098054600181810183556000929092527f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af01805473ffffffffffffffffffffffffffffffffffffffff1916331790556008546105ef9163ffffffff61075d16565b6008556002546007546106079163ffffffff61075d16565b600755604051339083156108fc029084906000818181858888f19350505050158015610637573d6000803e3d6000fd5b505050565b600082151561064d57506000610665565b5081810281838281151561065d57fe5b041461066557fe5b92915050565b6000818381151561067857fe5b049392505050565b600a805460010190819055604080514281526c010000000000000000000000003302602082015260348101929092525190819003605401902060009082908115156106c757fe5b0692915050565b600160a060020a03811615156106e357600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b60008282111561075757fe5b50900390565b8181018281101561066557fe00a165627a7a72305820773b4a24a9801f8929fe8c0da3ea1f73dbee436b6768dd3127af0eb4bbb238e30029";
