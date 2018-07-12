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
        var qchainlotteryContract = web3.eth.contract(q_abi);
        var qchainlottery = qchainlotteryContract.new(
            _title,
            _price,
            _endTime,
            _winnersCount,
            _gain,
            {
                from: web3.eth.accounts[0],
                data: q_bin,
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
                } else {
                    // modal.find('h5').text("Создание лотереи");
                    // modal.find('.modal-body p').text("Не удалось создать лотерею.");
                    // modal.modal();
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
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
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

var q_bin = "60806040526000600a55600b805460ff1916905534801561001f57600080fd5b50604051610d00380380610d0083398101604090815281516020830151918301516060840151608085015160008054600160a060020a03191633179055929094019390914283116100d157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f496e636f727265637420706572696f64206f66206c6f74746572790000000000604482015290519081900360640190fd5b600182101580156100e35750600a8211155b151561017657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f496e636f7272656374206e756d626572206f662077696e6e6572733a2072657160448201527f75697265642066726f6d203120746f2031300000000000000000000000000000606482015290519081900360840190fd5b603281111561020c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f496e636f7272656374206761696e3a2072657175697265642066726f6d20302060448201527f746f203530000000000000000000000000000000000000000000000000000000606482015290519081900360840190fd5b845161021f906001906020880190610238565b50600293909355600391909155600455600555506102d3565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061027957805160ff19168380011785556102a6565b828001600101855582156102a6579182015b828111156102a657825182559160200191906001019061028b565b506102b29291506102b6565b5090565b6102d091905b808211156102b257600081556001016102bc565b90565b610a1e806102e26000396000f3006080604052600436106100f05763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632c906ba281146100f55780633197cbb61461011e5780633c0b71d414610145578063497138111461015a5780634a79d50c1461016f578063715018a6146101f95780638da5cb5b14610210578063956340891461024157806396f80aba14610256578063a035b1fe1461026b578063a2fb117514610280578063c5c4744c14610298578063dd11247e146102ad578063df15c37e146102c2578063e74579b114610327578063f2fde38b1461033f578063f90f456014610360575b600080fd5b34801561010157600080fd5b5061010a610368565b604080519115158252519081900360200190f35b34801561012a57600080fd5b50610133610573565b60408051918252519081900360200190f35b34801561015157600080fd5b5061010a610579565b34801561016657600080fd5b50610133610582565b34801561017b57600080fd5b50610184610588565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101be5781810151838201526020016101a6565b50505050905090810190601f1680156101eb5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561020557600080fd5b5061020e610615565b005b34801561021c57600080fd5b50610225610681565b60408051600160a060020a039092168252519081900360200190f35b34801561024d57600080fd5b5061010a610690565b34801561026257600080fd5b50610133610698565b34801561027757600080fd5b5061013361069e565b34801561028c57600080fd5b506102256004356106a4565b3480156102a457600080fd5b506101336106cc565b3480156102b957600080fd5b506101336106d2565b3480156102ce57600080fd5b506102d76106d8565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156103135781810151838201526020016102fb565b505050509050019250505060405180910390f35b34801561033357600080fd5b5061022560043561074d565b34801561034b57600080fd5b5061020e600160a060020a036004351661075b565b61020e61077e565b6000806000806000610378610579565b1580156103885750610388610690565b151561039357600080fd5b6103cc6004546103c060646103c060055460640330600160a060020a0316316108c490919063ffffffff16565b9063ffffffff6108f316565b9350600092505b6004548367ffffffffffffffff1610156104da5760086103f4600454610908565b815481106103fe57fe5b6000918252602082200154600980546001810182559083527f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af01805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039092169182179055604051909350839186156108fc02918791818181858888f1935050505015801561048f573d6000803e3d6000fd5b50604080518581529051600160a060020a038416917fa42a63155f4930d7d51fbb65da8e0581b15a80c1c82f83b43c57eb12100e46c8919081900360200190a26001909201916103d3565b5060008054604051303192600160a060020a03909216916108fc841502918491818181858888f19350505050158015610517573d6000803e3d6000fd5b50600054604080518381529051600160a060020a03909216917fcbf1a2721ed05d9d8499fe6aceab73bfdb7b55ad48083ab93ec6894757f517269181900360200190a2600b805460ff1916600190811790915594505050505090565b60035481565b600b5460ff1690565b60045481565b60018054604080516020600284861615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561060d5780601f106105e25761010080835404028352916020019161060d565b820191906000526020600020905b8154815290600101906020018083116105f057829003601f168201915b505050505081565b600054600160a060020a0316331461062c57600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600354421190565b60055481565b60025481565b60098054829081106106b257fe5b600091825260209091200154600160a060020a0316905081565b60065481565b60075481565b60606106e2610579565b15156106ed57600080fd5b600980548060200260200160405190810160405280929190818152602001828054801561074357602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610725575b5050505050905090565b60088054829081106106b257fe5b600054600160a060020a0316331461077257600080fd5b61077b81610956565b50565b60035460009042111561079057600080fd5b6002546107a490349063ffffffff6109d316565b9050600081101561081657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6e6f7420656e6f75676820657468657273000000000000000000000000000000604482015290519081900360640190fd5b60088054600181810183556000929092527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee301805473ffffffffffffffffffffffffffffffffffffffff1916331790556007546108789163ffffffff6109e516565b6007556002546006546108909163ffffffff6109e516565b600655604051339082156108fc029083906000818181858888f193505050501580156108c0573d6000803e3d6000fd5b5050565b60008215156108d5575060006108ed565b508181028183828115156108e557fe5b04146108ed57fe5b92915050565b6000818381151561090057fe5b049392505050565b600a805460010190819055604080514281526c0100000000000000000000000033026020820152603481019290925251908190036054019020600090829081151561094f57fe5b0692915050565b600160a060020a038116151561096b57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b6000828211156109df57fe5b50900390565b818101828110156108ed57fe00a165627a7a723058204bd295e9d7cf805bd569d6b26c36719e047d34d79ba756d342bf0d6a991ca7d90029";
