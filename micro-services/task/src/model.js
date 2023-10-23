const mongoose=require('mongoose')
    
    const taskSchema =new mongoose.Schema(
      {
        // value: {
        //   type: String,
        //   required: true,
        // },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum:["OPEN","IN_PROGRESS","DONE"],
          default: "OPEN"
        },
        check: {
            type: String,
            required: true,
            default:false
          },
        user : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
          },
      },
      {
        timestamps: true,
      }
    )
    
   
    
    const ModelTask = mongoose.model('Task', taskSchema)
    
    module.exports=ModelTask