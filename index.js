"use strict"
/**
 *  Iota Node restarter : Restarts IRI from cron if it has fallen behind
 */

const IOTA = require('iota.lib.js')
const exec = require('child_process').exec;
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const newline = require('os').EOL;
const dateFormat = require('dateformat')

var log_file = fs.createWriteStream('watchdog.log', {flags : 'a'});

//This is meant to only run once via cron

const threshold = 20 //number of milestones behind we can be
const protocol = 'http'
const host = argv.h ? argv.h : '127.0.0.1'
const port = argv.p ? argv.p : 14625

const resyncing_milestone = 243000
const restart_iri_command = argv.c ? arv.c : "service iota restart"

var iota = new IOTA({host:protocol + '://'+ host,port:port})

iota.api.getNodeInfo(function(error, success){
	if(success){
		if(success.latestSolidSubtangleMilestoneIndex < success.latestMilestoneIndex - threshold){
				log('Node is out of sync!!!')
				restartIRI()
			} else if(success.latestMilestoneIndex == resyncing_milestone) {
				log('Node Resyncing')
			} else {
				log('Node OK')
			}
	} else {
		console.log(error)
	}
})

function restartIRI(){
	log('Restarting IRI')
	exec(restart_iri_command, (err, stdout, stderr) => {
	  if (err) {
	    // node couldn't execute the command
		 log('Some error happened restarting iri '+err)
	    return;
	  }

	});
}

function log(message){
	console.log(message)
	let timestamp = dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss')
	log_file.write(timestamp + ' - ' + message + newline)
}