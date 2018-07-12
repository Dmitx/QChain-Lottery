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

$(document).ready(function(){
  $(document).on('click', 'a.ajax', function(e){
    e.preventDefault();
    var el = $(this),
      contract_addr = el.closest('tr').data('contract');
    contract_addr = "0x74e8aAf77D0BfEB2abE89f0b2d8218D379a6B24E";
    contract_addr = "0xd757ebb746167495716ef3f11942c429203dbb75";
    var myContract = web3.eth.contract(q_abi).at(contract_addr);
    var modal = $("#infoModal");
    if(el.hasClass('buy-ticket')) {
        web3.eth.getAccounts(function(err, res){
            myContract.placeBet.sendTransaction({value: 10000000000000000}, function(err, res){
              console.log(res);
              modal.find('h5').text("Покупка билета");
              modal.find('.modal-body p').text("Билет куплен");
              modal.modal();
            });
        });
    }
    else if(el.hasClass('show-winners')) {
        web3.eth.getAccounts(function(err, res){
            myContract.getWinners(function(err, res){
                console.log(res);
                if(res.length > 0) {
                    res.forEach(function(w){
                        el.closest('td').append('<p>' + w + '</p>');
                    });
                } else {
                    modal.find('h5').text("Победители");
                    modal.find('.modal-body p').text("В этом розыгрше победители еще не определены");
                    modal.modal();
                }
            });
        });
    }
    else if(el.hasClass('finish-lottery')) {
        web3.eth.getAccounts(function(err, res){
            myContract.finishLottery(function(err, res){
                console.log(res);
                console.log(err);
                if(res.length === true) {
                    modal.find('h5').text("Завершение розыгрыша");
                    modal.find('.modal-body p').text("Розыгрыш завершен, можете посмотреть победителей");
                    modal.modal();
                } else {
                    modal.find('h5').text("Завершение розыгрыша");
                    modal.find('.modal-body p').text("Не удалось завершить проведение розыгрыша");
                    modal.modal();
                }
            });
        });
    }
  });
});
