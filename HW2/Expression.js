"use strict";
var tok     //current Token
var tokens  //Token.list()
var F = Object.getOwnPropertyNames(Math);
var a = F.filter(k => Math[k].length == 1);

function match(k) {
    if (tok.kind == k) 
        tok = tokens.pop();
    else expected(k);
}
function expected(s) {
    error(s+" expected -- "+tok+" found");
}
function error(s) {
    throw ("At index "+tok.index+": "+s);
}
function showError(elt) {
    elt.selectionStart = tok.index;
    elt.selectionEnd = tok.index + tok.length;
    elt.focus(); 
}

class Constant {
   constructor(num) { this.num = num; }
   fValue() { return this.num; }
   toTree() { return this.num+'\n'; }
   toPostfix() { return this.num+' '; }
   toString() { return this.num.toString(); }
}

class Ident{
	constructor(str, exp){
		this.str = str;
		this.exp = exp;
	}
	fValue(){
		return Math[this.str](this.exp);
	}
}

class Binary {
   constructor(left, oper, right) {
      this.left = left; this.oper = oper; this.right = right;
   }
   fValue() {
      switch (this.oper) {
      case PLUS:  return this.left.fValue()+this.right.fValue();
      case MINUS: return this.left.fValue()-this.right.fValue();
      case STAR:  return this.left.fValue()*this.right.fValue();
      case MOD:   return this.left.fValue()%this.right.fValue();
      case POWER: return this.left.fValue()**this.right.fValue();
      case SLASH: 
         let v = this.right.fValue();
         if (v == 0) 
            throw ("Division by zero");
         return this.left.fValue()/v;
      default: return NaN;
      }
   }
   toTree() {
      return this.oper+'\n'+this.left.toTree()+this.right.toTree()
   }
   toPostfix() {
      return this.left.toPostfix()+this.right.toPostfix()+this.oper+' '
   }
   toString() {
      return '('+this.left + this.oper + this.right+')'
   }
}

function binary(e) {
    let op = tok.kind; match(op);
    return new Binary(e, op, term());
}
function expression() {
    let e = (tok.kind == MINUS)?
      binary(new Constant(0)) : term();
    while (tok.kind == PLUS || tok.kind == MINUS) 
      e = binary(e);
    return e;
}
function term() {
    let e = factor();
    while (tok.kind == STAR || tok.kind == SLASH || tok.kind == MOD || tok.kind == POWER) {
        let op = tok.kind; match(op);
        e = new Binary(e, op, factor());
    }
    return e;
}
function factor() {
    switch (tok.kind)  {
    case NUMBER:
      let c = tok.val;
      match(NUMBER);
      return new Constant(c);
    case LEFT:
      match(LEFT); 
      let e = expression();
      match(RIGHT); return e;
      case IDENT: 
    		if(a.includes(tok.val)){
    			let strVal = String(tok.val);
    			match(IDENT);
    			match(LEFT);
    			let exp = expression();
    			if(exp instanceof Binary){
    				exp = exp.fValue();
    			}
    			match(RIGHT);
    			let id = new Ident(strVal, exp);
    			let abd = id.fValue();
    			abd = new Constant(abd);
    			return abd; 	
    	}
    default: expected("Factor");
    }
    return null;
}

