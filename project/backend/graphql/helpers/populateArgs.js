module.exports = (args,req) => {
  
    //console.log('populating user')
    if(args.user === "new"){
        if(req.created && req.created.user){args.user = req.created.user}
        else{throw new Error('No user was created in this mutation')}
    }
    
    //console.log('populating password')
    if(args.password === "new"){
        if(req.created && req.created.password){args.password = req.created.password}
        else{throw new Error('No password was created in this mutation')}
    }
    
    //console.log('populating token')
    if(args.token === "new"){
        if(req.created && req.created.token){args.token = req.created.token}
        else{throw new Error('No token was created in this mutation')}
    }

    //console.log('finished populating')

    return args
}