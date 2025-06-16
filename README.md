To open on phone->
Assumption:

Frontend PORT=5173,Backend PORT=5000(can modify according to your choice)
a.Follow these steps:
1.Open command prompt and type ipconfig.
2.Then under "Wireless LAN adapter Wi-Fi",copy IP4 address as we will need this.
b.Add this in the code- 
1.(Backend/server.js)   

Add app.use(cors({ origin: "http://{Your IP4 address}:5173", credentials: true }));
    instead of app.use(cors({ origin: "http://localhost:5173", credentials: true }));



2.(Backend/server.js)      

Add app.listen(PORT,'0.0.0.0',()=>{
            console.log(`Backend server started successfully on port ${PORT}!`);
            connectDB();
        }); 
instead of  app.listen(PORT,()=>{
            console.log(`Backend server started successfully on port ${PORT}!`);
            connectDB();
        });

3.(Frontend/vite.config.js) replace defineConfig with 
export default defineConfig({
    server: {
     host: "0.0.0.0", // Listen on all interfaces
    port: 5173,      // Optional
    },
    plugins: [tailwindcss(), react()],
    });
3.(Frontend/axios.js)  replace baseURL:'http://localhost:5000/api'
 with baseURL:'http://{Your IP4 address}:5000/api'
AND Thats it,Your are good to go!