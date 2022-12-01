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
    const properties = await Property.findAll({ where: { status: "available" } });
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

    return res.status(200).json({success:true,data:{
        "pending_inquiries" : pendingInquiries.length,
        "pending_tasks" : pendingTasks,
        "available_properties" : properties.length,
        "matching_properties" : matches,
    }});

    } catch (err) {
      console.log(err.message);
    }
  };
  


exports.getInquiryAnalysis = async (req, res) => {
    // stacked column chart 
    // grouped by location
    // filtered by rent, sale , price
try{
    let result = {}
    const inquiries = await Inquiry.findAll();

    inquiries.map( async (data) =>{

     

        if(data.location in result){

            result[data.location] = {
                "rent" : `${data.purchase_type === 'rent' ? ((result[data.location].rent)  + 1 ): (result[data.location].rent)}`,
                "sale"  :  `${data.purchase_type === 'sale' ? ((result[data.location].sale)  + 1 ) : (result[data.location].sale)}`,
                "price" : (result[data.location].price) + data.price
            }

        }
        else{
            result[data.location] = {
                "Rent" : `${data.purchase_type === 'rent' ? 1 : 0}`,
                "Sale"  :  `${data.purchase_type === 'sale' ? 1 : 0}`,
                "Price" : data.price
            }
        }


    })

    return res.status(200).json({success:true,data:result})


} catch (err) {
    console.log(err.message);
  }









};