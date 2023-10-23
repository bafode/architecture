const ModelTask = require("./model")

class Task {
    /** 
     *  @url=/task
     *  @method=GET
     */
    static async allTasks(req, res) {
        const pageSize = 10
        const page = Number(req.query.pageNumber) || 1
          
        let filter={
          user:req.user._id
        }
        if(req.query.keyword){
          filter={...filter, title: {
            $regex: req.query.keyword,
            $options: 'i',
          },}
        }
        if(req.query.status){
          filter={...filter, status: req.query.status}
        }

        const count = await ModelTask.countDocuments(filter)
        const tasks = await ModelTask.find(filter)
          .limit(pageSize)
          .skip(pageSize * (page - 1))
      
        res.json({ tasks, page, pages: Math.ceil(count / pageSize) })
    }

    /** 
     *  @url=/task/:id
     *  @method=GET
     */
    static async oneTask(req, res) {

    }

    /** 
     *  @url=/task/:id
     *  @method=PUT
     */
    static async updateTask(req, res) {
      const {status}=req.body
      const task=await ModelTask.findById(req.params.id)
      if(task){
        
         task.status=status,
         task.user=req.user._id
         const udpateTask =await task.save()
         res.status(200).json(udpateTask)
      }else{
        res.status(404)
        throw new Error('Task not found')
      }
      
      
    }

    /** 
     *  @url=/task
     *  @method=POST
     * @middleware=security,cache 
     */
    static async saveTask(req, res) {
        const {title,description,check}=req.body
        const task = new ModelTask({
           title:title,
           description:description,
           check:check,
           user:req.user._id
          })
        
          const createdtask = await task.save()
          res.status(201).json(createdtask)
    }

       /** 
     *  @url=/task
     *  @method=PATCH
     */
       static async partialUpdateTask(req, res) {

       }


    /** 
     *  @url=/task/:id
     *  @method=DELETE
     */
    static async deleteTask(req, res) {
      console.log(req.params.id)
      const task = await ModelTask.findById(req.params.id)

      if (task) {
        await task.deleteOne() 
        res.json({ message: 'task removed' })
      } else {
        res.status(404)
        throw new Error('Task not found')
      }
    }
}

module.exports = Task