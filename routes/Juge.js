const express = require("express");
const router = express.Router();
const passport = require("passport");
const logger = require("tracer").colorConsole();
const isEmpty = require("../utils/isEmpty");

const JugeController = require("../controllers/Juge");

//Ajouter les juges non inscrit dans SGI

router.get("/tous", (req, res) => {});

router.get("/finale/:finaleId", (req, res) => {});

router.get("/id/:jugeId", (req, res) => {});

router.get("/projet/:projetId", (req, res) => {});

router.get("/region/:finaleId", (req, res) => {});

router.post("/creer", (req, res) => {});

router.post("/connexion", (req, res) => {});

router.put("/modifier", (req, res) => {});

router.delete("/supprimer", (req, res) => {});

module.exports = router;
