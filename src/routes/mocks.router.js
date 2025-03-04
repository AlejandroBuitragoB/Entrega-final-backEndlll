import { Router } from "express";
import { generateUsers, generatePets } from "../services/mocking.js";

import User from "../dao/models/User.js";
import Pet from "../dao/models/Pet.js";


const router = Router();

router.get("/mockingusers", async (req, res) => {
    try {
        const users = [];
    
        for (let i = 0; i < 50; i++) {
          const role = Math.random() > 0.5 ? "user" : "admin";
          const userGenerated = await generateUsers(role);
          users.push(userGenerated);
        }
    
        res.json(users); 
      } catch (error) {
        res.status(500).json({ error: "Error generating users" });
      }

});


router.get("/mockingpets",   (req, res) => {
    try {
        const pets = [];
    
        for (let i = 0; i < 100; i++) {

          pets.push(generatePets());
        }
    
        res.json(pets); 
      } catch (error) {
        res.status(500).json({ error: "Error generating pets" });
      }

});

router.post("/generateData", async (req, res) => {
    try {

      const users = [];
      for (let i = 0; i < 50; i++) {
        const role = Math.random() > 0.5 ? "user" : "admin";
        const userGenerated = await generateUsers(role);
        users.push(userGenerated);
      }
  
      const savedUsers = await User.insertMany(users);
  
      const pets = [];
      for (let i = 0; i < 100; i++) {
        const petGenerated = generatePets();
        pets.push(petGenerated);
      }

      const savedPets = await Pet.insertMany(pets);
  
 
      for (let pet of savedPets) {

        const randomUser = savedUsers[Math.floor(Math.random() * savedUsers.length)];
  

        await Pet.findByIdAndUpdate(pet._id, { owner: randomUser._id });
  
        await User.findByIdAndUpdate(randomUser._id, {
          $push: { pets: { _id: pet._id } }
        });
      }
  

      res.status(201).json({
        users: savedUsers,
        pets: savedPets
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error generating data" });
    }
  });

export default router;