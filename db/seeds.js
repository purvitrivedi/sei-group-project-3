const mongoose = require("mongoose");
const Hike = require("../models/hike");
const User = require("../models/user");
const Group = require("../models/group");
const dotenv = require("dotenv");
dotenv.config();
const hikeData = require("./data/hikes");
const groupData = require("./data/groups");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // NEW: no options needed

    console.log("Connected to MongoDB");

    // Drop the whole DB
    await mongoose.connection.dropDatabase();
    console.log("Database dropped");

    const users = [
      {
        username: "purvi",
        email: "purvi@email",
        password: "pass",
        passwordConfirmation: "pass",
        fullName: "Purvi Trivedi",
        profileImage:
          "https://ca.slack-edge.com/T0351JZQ0-USUJBDV5K-2f32610034a1-512",
        bio: "i love mountains...",
      },
      {
        username: "andy",
        email: "andy@email",
        password: "pass",
        passwordConfirmation: "pass",
        fullName: "Andy Bradshaw",
        profileImage:
          "https://ca.slack-edge.com/T0351JZQ0-UU102331A-b57d0b0c7344-512",
        bio: "I am a keen outdoorsman...",
      },
      {
        username: "kuriko",
        email: "kuriko@email",
        password: "pass",
        passwordConfirmation: "pass",
        fullName: "Kuriko Iwai",
        profileImage:
          "https://ca.slack-edge.com/T0351JZQ0-UTPHSCSFM-2d30f354c545-512",
      },
      {
        username: "jack",
        email: "jack@email",
        password: "pass",
        passwordConfirmation: "pass",
        fullName: "Jack May",
        profileImage:
          "https://ca.slack-edge.com/T0351JZQ0-UF7T00ANN-9e0ffcda6506-512",
      },
      {
        username: "charlotte",
        email: "charlotte@email",
        password: "pass",
        passwordConfirmation: "pass",
        fullName: "Charlotte Morgan",
        profileImage:
          "https://ca.slack-edge.com/T0351JZQ0-UDC194EAH-3d2a5f44ffa8-512",
      },
      {
        username: "abi",
        email: "abi@email",
        password: "pass",
        passwordConfirmation: "pass",
        fullName: "Abigail Foreman",
        profileImage:
          "https://ca.slack-edge.com/T0351JZQ0-UPF4VBW6A-aa58c07cbaf1-512",
      },
    ];

    // Create users
    const createdUsers = await User.create(users);
    console.log(`${createdUsers.length} Users created`);

    // Hikes with random users
    const hikesWithUsers = hikeData.map((hike) => ({
      ...hike,
      user: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id,
    }));

    const groupsWithUsers = groupData.map((group) => ({
      ...group,
      createdMember:
        createdUsers[Math.floor(Math.random() * createdUsers.length)]._id,
    }));

    const hikes = await Hike.create(hikesWithUsers);
    console.log(`${"⛰️".repeat(hikes.length)} Hikes created`);

    const groups = await Group.create(groupsWithUsers);
    console.log(`${"🙌".repeat(groups.length)} Groups created`);

    console.log("Seed complete!");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Database connection closed — Cheers Then!");
  }
}

seed();
