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
      + "</td><td><a href='#' class='btn btn-success ajax buy-ticket'>Купить</a></td><td>"
      + "<a href='#' class='btn btn-info ajax show-winners'>Показать</a></td>"
      + "<td><a href='#' class='btn btn-danger ajax finish-lottery'>Остановить</a></td></tr>";
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
        var modal = $("#infoModal");
        console.log('eth');
        console.log(lottery);
      lottery.user_hash = res[0];
      lottery.transaction_hash = res[0];
      // content: JSON.stringify(lottery),
      // let data = {
      //   content: JSON.stringify(lottery)
      // };
      // var myContract = web3.eth.contract(q_abi);
      // console.log(myContract);
      var date_end = Date.parse(lottery.date_end)/1000;
      console.log(lottery.date_end + ' == ' + date_end);
      // var deployed = myContract.deploy({
      //   data: q_bin,
      //   arguments: [
      //     lottery.title,
      //     lottery.price,
      //     date_end,
      //     lottery.winner_count,
      //     lottery.gain
      //   ]
      // });
        var _title = lottery.title ;
        var _price = lottery.price ;
        var _endTime = date_end ;
        var _winnersCount = lottery.winner_count ;
        var _gain = lottery.gain ;
        var qchainlotteryContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"finishLottery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lotteryIsEnded","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"winnersCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"title","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betPeriodIsEnded","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gainProcent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"winners","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalTickets","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWinners","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lotteryTickets","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"placeBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_title","type":"string"},{"name":"_price","type":"uint256"},{"name":"_endTime","type":"uint256"},{"name":"_winnersCount","type":"uint256"},{"name":"_gain","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"winner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"WinnerEthTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"OwnerEthTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]);
        var qchainlottery = qchainlotteryContract.new(
            _title,
            _price,
            _endTime,
            _winnersCount,
            _gain,
            {
                from: web3.eth.accounts[0],
                data: '0x60806040526000600a55600b805460ff1916905534801561001f57600080fd5b50604051610cf8380380610cf883398101604090815281516020830151918301516060840151608085015160008054600160a060020a03191633179055929094019390914283116100d157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f496e636f727265637420706572696f64206f66206c6f74746572790000000000604482015290519081900360640190fd5b600182101580156100e35750600a8211155b151561017657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f496e636f7272656374206e756d626572206f662077696e6e6572733a2072657160448201527f75697265642066726f6d203120746f2031300000000000000000000000000000606482015290519081900360840190fd5b603281111561020c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f496e636f7272656374206761696e3a2072657175697265642066726f6d20302060448201527f746f203530000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b845161021f906001906020880190610238565b50600293909355600391909155600455600555506102d3565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061027957805160ff19168380011785556102a6565b828001600101855582156102a6579182015b828111156102a657825182559160200191906001019061028b565b506102b29291506102b6565b5090565b6102d091905b808211156102b257600081556001016102bc565b90565b610a16806102e26000396000f3006080604052600436106100f05763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632c906ba281146100f55780633197cbb61461010c5780633c0b71d414610133578063497138111461015c5780634a79d50c14610171578063715018a6146101fb5780638da5cb5b14610210578063956340891461024157806396f80aba14610256578063a035b1fe1461026b578063a2fb117514610280578063c5c4744c14610298578063dd11247e146102ad578063df15c37e146102c2578063e74579b114610327578063f2fde38b1461033f578063f90f456014610360575b600080fd5b34801561010157600080fd5b5061010a610368565b005b34801561011857600080fd5b5061012161056b565b60408051918252519081900360200190f35b34801561013f57600080fd5b50610148610571565b604080519115158252519081900360200190f35b34801561016857600080fd5b5061012161057a565b34801561017d57600080fd5b50610186610580565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101c05781810151838201526020016101a8565b50505050905090810190601f1680156101ed5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561020757600080fd5b5061010a61060d565b34801561021c57600080fd5b50610225610679565b60408051600160a060020a039092168252519081900360200190f35b34801561024d57600080fd5b50610148610688565b34801561026257600080fd5b50610121610690565b34801561027757600080fd5b50610121610696565b34801561028c57600080fd5b5061022560043561069c565b3480156102a457600080fd5b506101216106c4565b3480156102b957600080fd5b506101216106ca565b3480156102ce57600080fd5b506102d76106d0565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156103135781810151838201526020016102fb565b505050509050019250505060405180910390f35b34801561033357600080fd5b50610225600435610745565b34801561034b57600080fd5b5061010a600160a060020a0360043516610753565b61010a610776565b600080600080610376610571565b1580156103865750610386610688565b151561039157600080fd5b6103ca6004546103be60646103be60055460640330600160a060020a0316316108bc90919063ffffffff16565b9063ffffffff6108eb16565b9350600092505b6004548367ffffffffffffffff1610156104d85760086103f2600454610900565b815481106103fc57fe5b6000918252602082200154600980546001810182559083527f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af01805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039092169182179055604051909350839186156108fc02918791818181858888f1935050505015801561048d573d6000803e3d6000fd5b50604080518581529051600160a060020a038416917fa42a63155f4930d7d51fbb65da8e0581b15a80c1c82f83b43c57eb12100e46c8919081900360200190a26001909201916103d1565b5060008054604051303192600160a060020a03909216916108fc841502918491818181858888f19350505050158015610515573d6000803e3d6000fd5b50600054604080518381529051600160a060020a03909216917fcbf1a2721ed05d9d8499fe6aceab73bfdb7b55ad48083ab93ec6894757f517269181900360200190a25050600b805460ff191660011790555050565b60035481565b600b5460ff1690565b60045481565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156106055780601f106105da57610100808354040283529160200191610605565b820191906000526020600020905b8154815290600101906020018083116105e857829003601f168201915b505050505081565b600054600160a060020a0316331461062457600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600354421190565b60055481565b60025481565b60098054829081106106aa57fe5b600091825260209091200154600160a060020a0316905081565b60065481565b60075481565b60606106da610571565b15156106e557600080fd5b600980548060200260200160405190810160405280929190818152602001828054801561073b57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161071d575b5050505050905090565b60088054829081106106aa57fe5b600054600160a060020a0316331461076a57600080fd5b6107738161094e565b50565b60035460009042111561078857600080fd5b60025461079c90349063ffffffff6109cb16565b9050600081101561080e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6e6f7420656e6f75676820657468657273000000000000000000000000000000604482015290519081900360640190fd5b60088054600181810183556000929092527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee301805473ffffffffffffffffffffffffffffffffffffffff1916331790556007546108709163ffffffff6109dd16565b6007556002546006546108889163ffffffff6109dd16565b600655604051339082156108fc029083906000818181858888f193505050501580156108b8573d6000803e3d6000fd5b5050565b60008215156108cd575060006108e5565b508181028183828115156108dd57fe5b04146108e557fe5b92915050565b600081838115156108f857fe5b049392505050565b600a805460010190819055604080514281526c0100000000000000000000000033026020820152603481019290925251908190036054019020600090829081151561094757fe5b0692915050565b600160a060020a038116151561096357600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b6000828211156109d757fe5b50900390565b818101828110156108e557fe00a165627a7a723058201a79379f9e7ad574c967c57b520eb76330366a39b4fae226cb3ec781e12795ae0029',
                gas: '4700000'
            }, function (e, contract){
                console.log(e, contract);
                if (typeof contract.address !== 'undefined') {
                    lottery.contract = contract.address;
                    lottery.transaction_hash = contract.transactionHash;
                    let data = {
                        content: JSON.stringify(lottery)
                    };
                    HTTP.post('http://app.r2ls.ru:8080/api/lotteries', data, function(err,result){
                        modal.find('h5').text("Создание лотереи");
                        modal.find('.modal-body p').text("Лотерея успешно создана. Адрес: " + contract.address);
                        modal.modal();
                    });

                    // console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                }
            });
      //.then(function(newContractInstance){
      //   lottery.transaction_hash = newContractInstance.options.address;
      //   let data = {
      //     content: JSON.stringify(lottery)
      //   };
      //   HTTP.post('http://app.r2ls.ru:8080/api/lotteries', data, function(err,result){
      //     console.log(result);
      //   });
      //     console.log(newContractInstance.options.address) // instance with the new contract address
      // });
      //   console.log(deployed);
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

const q_address = "0x74e8aAf77D0BfEB2abE89f0b2d8218D379a6B24E";

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
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "OwnerEthTransfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "winner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "WinnerEthTransfer",
        "type": "event"
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
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
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
        "constant": true,
        "inputs": [],
        "name": "betPeriodIsEnded",
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
        "name": "getWinners",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "lotteryIsEnded",
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
        "name": "winners",
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
    }
];

var q_bin = "60806040526000600a55600b805460ff1916905534801561001f57600080fd5b50604051610cf8380380610cf883398101604090815281516020830151918301516060840151608085015160008054600160a060020a03191633179055929094019390914283116100d157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f496e636f727265637420706572696f64206f66206c6f74746572790000000000604482015290519081900360640190fd5b600182101580156100e35750600a8211155b151561017657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f496e636f7272656374206e756d626572206f662077696e6e6572733a2072657160448201527f75697265642066726f6d203120746f2031300000000000000000000000000000606482015290519081900360840190fd5b603281111561020c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f496e636f7272656374206761696e3a2072657175697265642066726f6d20302060448201527f746f203530000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b845161021f906001906020880190610238565b50600293909355600391909155600455600555506102d3565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061027957805160ff19168380011785556102a6565b828001600101855582156102a6579182015b828111156102a657825182559160200191906001019061028b565b506102b29291506102b6565b5090565b6102d091905b808211156102b257600081556001016102bc565b90565b610a16806102e26000396000f3006080604052600436106100f05763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632c906ba281146100f55780633197cbb61461010c5780633c0b71d414610133578063497138111461015c5780634a79d50c14610171578063715018a6146101fb5780638da5cb5b14610210578063956340891461024157806396f80aba14610256578063a035b1fe1461026b578063a2fb117514610280578063c5c4744c14610298578063dd11247e146102ad578063df15c37e146102c2578063e74579b114610327578063f2fde38b1461033f578063f90f456014610360575b600080fd5b34801561010157600080fd5b5061010a610368565b005b34801561011857600080fd5b5061012161056b565b60408051918252519081900360200190f35b34801561013f57600080fd5b50610148610571565b604080519115158252519081900360200190f35b34801561016857600080fd5b5061012161057a565b34801561017d57600080fd5b50610186610580565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101c05781810151838201526020016101a8565b50505050905090810190601f1680156101ed5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561020757600080fd5b5061010a61060d565b34801561021c57600080fd5b50610225610679565b60408051600160a060020a039092168252519081900360200190f35b34801561024d57600080fd5b50610148610688565b34801561026257600080fd5b50610121610690565b34801561027757600080fd5b50610121610696565b34801561028c57600080fd5b5061022560043561069c565b3480156102a457600080fd5b506101216106c4565b3480156102b957600080fd5b506101216106ca565b3480156102ce57600080fd5b506102d76106d0565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156103135781810151838201526020016102fb565b505050509050019250505060405180910390f35b34801561033357600080fd5b50610225600435610745565b34801561034b57600080fd5b5061010a600160a060020a0360043516610753565b61010a610776565b600080600080610376610571565b1580156103865750610386610688565b151561039157600080fd5b6103ca6004546103be60646103be60055460640330600160a060020a0316316108bc90919063ffffffff16565b9063ffffffff6108eb16565b9350600092505b6004548367ffffffffffffffff1610156104d85760086103f2600454610900565b815481106103fc57fe5b6000918252602082200154600980546001810182559083527f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af01805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039092169182179055604051909350839186156108fc02918791818181858888f1935050505015801561048d573d6000803e3d6000fd5b50604080518581529051600160a060020a038416917fa42a63155f4930d7d51fbb65da8e0581b15a80c1c82f83b43c57eb12100e46c8919081900360200190a26001909201916103d1565b5060008054604051303192600160a060020a03909216916108fc841502918491818181858888f19350505050158015610515573d6000803e3d6000fd5b50600054604080518381529051600160a060020a03909216917fcbf1a2721ed05d9d8499fe6aceab73bfdb7b55ad48083ab93ec6894757f517269181900360200190a25050600b805460ff191660011790555050565b60035481565b600b5460ff1690565b60045481565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156106055780601f106105da57610100808354040283529160200191610605565b820191906000526020600020905b8154815290600101906020018083116105e857829003601f168201915b505050505081565b600054600160a060020a0316331461062457600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600354421190565b60055481565b60025481565b60098054829081106106aa57fe5b600091825260209091200154600160a060020a0316905081565b60065481565b60075481565b60606106da610571565b15156106e557600080fd5b600980548060200260200160405190810160405280929190818152602001828054801561073b57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161071d575b5050505050905090565b60088054829081106106aa57fe5b600054600160a060020a0316331461076a57600080fd5b6107738161094e565b50565b60035460009042111561078857600080fd5b60025461079c90349063ffffffff6109cb16565b9050600081101561080e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6e6f7420656e6f75676820657468657273000000000000000000000000000000604482015290519081900360640190fd5b60088054600181810183556000929092527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee301805473ffffffffffffffffffffffffffffffffffffffff1916331790556007546108709163ffffffff6109dd16565b6007556002546006546108889163ffffffff6109dd16565b600655604051339082156108fc029083906000818181858888f193505050501580156108b8573d6000803e3d6000fd5b5050565b60008215156108cd575060006108e5565b508181028183828115156108dd57fe5b04146108e557fe5b92915050565b600081838115156108f857fe5b049392505050565b600a805460010190819055604080514281526c0100000000000000000000000033026020820152603481019290925251908190036054019020600090829081151561094757fe5b0692915050565b600160a060020a038116151561096357600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b6000828211156109d757fe5b50900390565b818101828110156108e557fe00a165627a7a723058201a79379f9e7ad574c967c57b520eb76330366a39b4fae226cb3ec781e12795ae0029";
