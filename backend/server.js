const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors');

const app = express();
app.use(express.json());

// Configure CORS to allow the specific URL
const corsOptions = {
  origin: 'http://localhost:3000',
};


// Use the CORS middleware with the specified options
app.use(cors(corsOptions));

// Connect to MongoDB Atlas
// mongoose.connect("mongodb+srv://<user_name>:<password>@cluster0.cikhuki.mongodb.net/TripsDB?retryWrites=true&w=majority&appName=Cluster0", { 
mongoose
  .connect("mongodb://localhost:27017/iternaryDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Trip Schema and Model
const tripSchema = new mongoose.Schema({
  destination: String,
    startDate: Date,
    endDate: Date,
    expenses: Number
});

const Trip = mongoose.model("Trip", tripSchema);

// Routes

// Insert a new Trip document
app.post("/api/itineraries", async (req, res) => {
  try {
    const trip = new Trip(req.body); // Expecting full Trip object in the request body
    await trip.save();
    res.status(201).json({ message: "Trip added successfully", Trip });
  } catch (err) {
    res.status(400).json({ message: "Failed to add Trip", error: err });
  }
});

// Update Trip data based on rollNo
app.put("/api/itineraries/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id },
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedTrip) {
      res.status(200).json({ message: "Trip updated successfully", updatedTrip });
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Failed to update Trip", error: err });
  }
});

// Delete a Trip document based on id
app.delete("/api/itineraries/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedTrips = await Trip.deleteMany({ _id });
    if (deletedTrips.deletedCount > 0) {
      res.status(200).json({ 
        message: "Trips deleted successfully", 
        deletedCount: deletedTrips.deletedCount 
      });
    } else {
      res.status(404).json({ message: "No Trips found with the given roll number" });
    }
  } catch (err) {
    res.status(400).json({ message: "Failed to delete Trips", error: err });
  }
});


// Retrieve all Trips' information: rollNo, name, GPA
app.get("/totalExpenses", async (req, res) => {
  try {
    const Trips = await Trip.find({}, { destination:1, startDate:1, endDate:1, expenses:1}); // Fetch specific fields
    const totalExpenses = Trips.reduce((acc, Trip) => acc + Trip.expenses, 0);
    res.status(200).json({ totalExpenses, Trips });
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch Trips", error: err });
  }
});

// Retrieve Trip details by rollNo
app.get("/api/itineraries", async (req, res) => {
  try {
    const trips = await Trip.find({}, { destination:1, startDate:1, endDate:1, expenses:1});
    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching Trips:", error);
    res.status(500).json({ message: "Failed to fetch Trips", error });
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
