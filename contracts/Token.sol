// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./SafeMath.sol";
import "./IERC20.sol";

contract ERC20 is IERC20 {
    string public name = "etherspay";
    string public symbol = "EPT";
    uint8 public decimals = 18;
    uint256 public _totalSupply = 21000000 ether; // 21 million tokens
    address private _owner;

    using SafeMath for uint256;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowed;

    constructor() {
        _balances[msg.sender] = _totalSupply;
        _owner = msg.sender;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address tokenOwner) public view override returns (uint256) {
        return _balances[tokenOwner];
    }

    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowed[owner][spender];
    }

    function transfer(address receiver, uint256 amount) public override returns (bool)
    {
        require(amount <= _balances[msg.sender]);
        require(receiver != address(0), 'Receiver address cannot be zero address');

        _balances[msg.sender] = _balances[msg.sender].sub(amount);
        _balances[receiver] = _balances[receiver].add(amount);

        emit Transfer(msg.sender, receiver, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        _allowed[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }


    function transferFrom(address owner, address buyer, uint256 amount ) public override returns (bool) {
        require(amount <= _balances[owner], 'Insufficient balance');
        require(amount <= _allowed[owner][msg.sender], 'Insufficient allowance');

        _balances[owner] = _balances[owner].sub(amount);
        _allowed[owner][msg.sender] = _allowed[owner][msg.sender].sub(amount);

        _balances[buyer] = _balances[buyer].add(amount);
        emit Transfer(owner, buyer, amount);
        return true;
    }

    function increaseAllowance( address spender, uint256 addedValue) public returns (bool) {
        require(spender != address(0));

        _allowed[msg.sender][spender] = (
        _allowed[msg.sender][spender].add(addedValue));
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        require(spender != address(0));

        _allowed[msg.sender][spender] = (
        _allowed[msg.sender][spender].sub(subtractedValue));
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }
}
