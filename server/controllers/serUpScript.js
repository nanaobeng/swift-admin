const Developer = require("../models/Developer");
const Inquiry = require("../models/Inquiry");
const Property = require("../models/Property");

exports.createValues = async (req, res) => {

    try {
    
    
        const newDeveloper = await Developer.create({
            name  : "Trassacco",
            email  : "trassaco@gmail.com",
            type  : "Reseidential"
          
          });
        
          const newDeveloper2 = await Developer.create({
            name  : "Devtraco",
            email  : "devtes@gmail.com",
            type  : "Reseidential"
          
          });
        
        
          const newDeveloper3 = await Developer.create({
            name  : "Buena Vista",
            email  : "bvh@gmail.com",
            type  : "Reseidential"
          
          });
        
        
        
          const newProperty = await Property.create({
            title  : "4 bedroom house",
            developer  : 1,
            email  : "test email",
            purchase_type  : "rent",
            property_type  : "residential",
            rooms  : 4,
            location  : "Haatso",
            price : 10000,
            status : "available"
          
          });
        
          const newProperty2 = await Property.create({
            title  : "Boutique Villa",
            developer  : 2,
            email  : "test email",
            purchase_type  : "sale",
            property_type  : "residential",
            rooms  : 2,
            location  : "Cantonments",
            price : 20000,
            status : "available"
          
          });
        
          const newProperty3 = await Property.create({
            title  : "Family Townhouse",
            developer  : 2,
            email  : "test email",
            purchase_type  : "rent",
            property_type  : "residential",
            rooms  : 3,
            location  : "Haatso",
            price : 17000,
            status : "available"
          
          });
        
        
          const newInquiry = await Inquiry.create({
            client  : "Lynda Adjei",
            phone  : "0222444245",
            email  : "test email",
            purchase_type  : "rent",
            property_type : "residential",
            duration_of_stay  : 32,
            rooms  : 4,
            location  : "Haatso",
            price : 17000,
            commencement_date : new Date(),
            status : "pending"
        
            
          
          });
      
          return res.status(401).json({ success:"Created" });
  
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send( {
        success: false,
        msg : "Error occured during creation."
    });
    }
  };
