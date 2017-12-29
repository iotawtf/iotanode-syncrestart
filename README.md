# iotanode-syncrestart
Simple node.js script to restart iota node if it falls out of sync. Must be run on same machine as node.

Make sure to run npm install to install dependencies

##TIPS:

Run this every 5 minutes in cron as root user (or whatever user can control IRI)

Example: 
    */5 * * * * node /root/iotanode-syncrestart/index.js

##SETTINGS:

Just edit them at the top of index.js (for now)

    const protocol = 'http' //Can be http or https
    const host = '127.0.0.1' //should always be this but may be localhost or some other loopback address
    const port = 14625 //the port of your IRI API. If you have an ini for your IRI, it is the PORT setting
    const resyncing_milestone = 243000 //This is the milestone your node goes to when it is resyncing
    const restart_iri_command = "service iota restart" //This is the command used to restart iota. Other examples could be /etc/init.d scripts or even have a script that directly kills java and restarts iri.

