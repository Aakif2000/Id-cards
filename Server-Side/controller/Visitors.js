let Visitor = require("../model/Visitor");
let IdCard = require("../model/IdCard");
const { createCanvas, loadImage } = require("canvas");

const saveVisitorDetails = async (req, res) => {
  try {
    const { name, email, contactNo, companyName, designation, profileImage } =
      req.body;

    // Save visitor details
    const visitor = await Visitor.create({
      name,
      email,
      contactNo,
      companyName,
      designation,
      profileImage, // Base64 image
    });

    // Return saved visitor data
    res.status(201).json({
      status: "success",
      message: "Visitor saved successfully!",
      data: visitor.id,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      status: "error",
      message: "Error saving visitor details.",
      error,
    });
  }
};

// const { createCanvas, loadImage } = require('canvas');

const generateIdCard = async (req, res) => {
  try {
    const { userId } = req.body;
    const visitor = await Visitor.findByPk(userId);
    if (!visitor) {
      return res
        .status(404)
        .json({ status: "error", message: "Visitor not found." });
    }
    const canvas = createCanvas(600, 300);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(242 151 39)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(`Name: ${visitor.name}`, 20, 100);
    ctx.fillText(`Company: ${visitor.companyName}`, 20, 220);
    ctx.fillText(`Designation: ${visitor.designation}`, 20, 260);
    ctx.fillText(`ID No.: TSK100${visitor.id}`, 20, 260);
    if (visitor.profileImage) {
      try {
        let imageSource = visitor.profileImage;
        const validFormats = ["jpeg", "jpg", "png"];
        const formatMatch = imageSource.match(
          /data:image\/(jpeg|jpg|png);base64,/
        );
        if (!formatMatch) {
          throw new Error("Unsupported image format.");
        }
        const format = formatMatch[1];
        console.log(`Detected format: ${format}`);
        const img = await loadImage(imageSource);
        ctx.drawImage(img, 20, 300, 100, 100);
      } catch (imageError) {
        console.error("Error loading profile image:", imageError);
        ctx.fillText("Profile Image Error", 20, 300);
      }
    }
    // Convert canvas to Base64 string
    const idCardBase64 = canvas.toDataURL("image/png");
    // Save ID Card in the database
    const idCard = await IdCard.create({
      idCard: idCardBase64,
      userID: visitor.id,
    });

    res.status(201).json({
      status: "success",
      message: "ID Card generated and saved successfully!",
      // idCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error generating ID card.",
      error,
    });
  }
};

module.exports = {
  saveVisitorDetails,
  generateIdCard,
};

// Hide form after successful submission
