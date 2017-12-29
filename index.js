"use strict"
/**
 *  Iota Node restarter : Restarts IRI from cron if it has fallen behind
 */

const IOTA = require('iota.lib.js')
const exec = require('child_process').exec;

//This is meant to only run once via cron

const threshold = 20 //number of milestones behind we can be
const protocol = 'http'
const host = '127.0.0.1'
const port = 14625
const resyncing_milestone = 243000
const restart_iri_command = "service iota restart"

var iota = new IOTA({host:protocol + '://'+ host,port:port})

iota.api.getNodeInfo(function(error, success){
	if(success){
		if(success.latestSolidSubtangleMilestoneIndex < success.latestMilestoneIndex - threshold){
				console.log('Node is out of sync!!!')
				restartIRI()
			} else if(success.latestMilestoneInxed == resyncing_milestone) {
				console.log('Node is resyncing')
			} else {
				console.log('Node seems OK')
			}
	} else {
		console.log(error)
	}
})

function restartIRI(){
	
	exec(restart_iri_command, (err, stdout, stderr) => {
	  if (err) {
	    // node couldn't execute the command
		  console.log('error issuing command')
	    return;
	  }

	  // the *entire* stdout and stderr (buffered)
	  console.log(`stdout: ${stdout}`);
	  console.log(`stderr: ${stderr}`);
	});
}