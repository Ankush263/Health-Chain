// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BillPay {
    function pay(address payable _to) payable public {
        require(msg.value > 0, "Can't send amount 0");
        payable(_to).transfer(msg.value);
    }
}