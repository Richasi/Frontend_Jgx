const app = require('./app');

const PORT = process.env.PORT || 5001; // Change to 5001 or any other port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
