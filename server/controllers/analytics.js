const Developer = require("../models/Developer");
const Inquiry = require("../models/Inquiry");
const Property = require("../models/Property");
const Task = require("../models/Task");

require("dotenv").config();

exports.getDashboardSummary = async (req, res) => {
    try {
    
      const { id } = req.body;

   

    const {count} = await Task.findAndCountAll({

        where: {
          status: 'completed',
          id : id
        }
      });
  
    const pendingTasks = count


    const pendingInquiries = await Inquiry.findAll({ where: { status: "pending" } });
    const developers = await Developer.findAll();
    const properties = await Property.findAll();
    let matches= {}


    // Match Inquiries to Properties

    // i want to match available properties to inquiries
    // get all available properties
    // iterate through inquiries, if the match the devs , then add to list
    // rooms (2) price (500) , location , property , purchase

    function confirmMatch(inquiry,property){
        if(
            
            (inquiry.price <= (property.price + 500) && inquiry.price >= (property.price - 500) ) &&
            (inquiry.rooms <= (property.rooms + 2) && inquiry.rooms >= (property.rooms - 2 ) ) &&
            (inquiry.location === property.location) &&
            (inquiry.purchase_type === property.purchase_type) &&
            (inquiry.property_type === property.property_type) 

        
        
        ){
            return true
        }


        return false

    }

    pendingInquiries.map( async (inquiry) => {


        properties.map( async (property) => {

            if(confirmMatch(inquiry,property)){
                matches[matches.length + 1] = {
                    "inquiry" : {
                        "id" : inquiry.id,
                        "client" : inquiry.client,
                        "duration" : inquiry.duration_of_stay,
                        "location" : inquiry.location,
                        "property_type" : inquiry.property_type,
                        "purchase_type" : inquiry.purchase_type,
                        "price" : inquiry.price,
                        "phone" : inquiry. phone,
                        "email" : inquiry.email
                    },

                    "property" : {
                        "id" : property.id,
                        "developer" : property.developer,
                        "location" : property.location,
                        "property_type" : property.property_type,
                        "purchase_type" : property.purchase_type,
                        "price" : property.price,
                        "phone" : property. phone,
                        "email" : property.email
                    }


                }
            }

        })
       
       





    })

    

    } catch (err) {
      console.log(err.message);
    }
  };
  