const controller = {}

controller.list = (req, res) =>{
  req.getConnection((err, connection) => {
    connection.query('SELECT * FROM customer', (_err, customers) => {
      if(err){
        // next(err);
        res.json(err);
      }
      // console.log(customers);
      res.render('customers',{
        data: customers,
      });
    });
  });
};

controller.save = (req, res) =>{
  const data = req.body;
  // console.log(data);
  req.getConnection((err, connection) => {
    if(err){
      res.json(err);
    }
    connection.query('INSERT INTO customer set ?', [data], (_err, customer) => {
      // console.log(_err);
      res.redirect('/');
    });
  });
};

controller.edit = (req, res) =>{
  const {id} = req.params;
  console.log(id);
  req.getConnection((err, connection) => {
    if(err){
      res.json(err);
    }
    connection.query('SELECT * FROM customer WHERE id = ?', [id], (_err, customer) => {
      if(_err){
        res.json(_err);
      }
      res.render('customerEdit',{
        data: customer[0]
      })
    });
  });
};

controller.update = (req, res) =>{
  const {id} = req.params;
  const newCustomer = req.body;
  req.getConnection((err, connection) => {
    connection.query('UPDATE customer set ? WHERE id = ?', [newCustomer, id], (_err, customer) => {
    if(_err){
      res.json(_err);
    }
    res.redirect('/');
   });
  })
  
};

controller.delete = (req, res) =>{
  const id = req.params.id;
  // const {_id } =  req.params;
  req.getConnection((err, connection) => {
    if(err){
      res.json(err);
    }
    connection.query('DELETE FROM customer WHERE id = ?', [id], (_err, customer) => {
      if(err){
        res.json(_err);
      }
      console.log(customer);
      res.redirect('/');
    });
  });
};


module.exports = controller;