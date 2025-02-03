const port = process.env.PORT || 8866;
app.set('port', port);

server.listen(port, () => {
    console.log(`HTTPS Server is running on https://localhost:${port}`);
});

server.on('error', (error) => {
    console.error("Server Error:", error);
    process.exit(1);
});