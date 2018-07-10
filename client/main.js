import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Navbar } from './import/header.html';


import './main.html';
import './style/bootstrap.min.css';
import './js/bootstrap.min.js';
import './style/style.import.less';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
