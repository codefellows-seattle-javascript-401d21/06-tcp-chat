This is an application designed to simulate a chat room on a local node server. Client.js contains our object constructor. Server.js contains the server materials. Cmd.js handles the chat messages and the different commands.

To engage with this application run a nodemon server in your terminal. Now in a seperate terminal window run the command "nc localhost 3000"

This will open up a new socket with a unique username. 

If you open up a new terminal window, you can then type messages into your terminal and the other terminals can view them. 

In addition to sending messages there are also four commands: 
    /list - gives a list of all current users
    /quit - quits the current terminal window's application
    /nickname - sets the current users nickname to whatever is placed after the space
        e.g.: /nickname bill_od will set the nickname to bill_od
            (nicknames must be one word)
    /dm - sends a direct message to the directed user
        e.g.: /dm bill_od Hello Bill, nice to see you
            (/dm <intended user> <message>)
