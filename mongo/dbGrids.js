

db.accounts.drop();

db.accounts.insert([
    {
        _id: 'luqanuhos@mailinator.com',
        firstName: 'Rooney',
        lastName: 'Mcleod',
        password: 'hi',
      
        
    },
    {
        _id: 'jamesmcdonald@gmail.com',
        firstName: 'James',
        lastName: 'McDonald',
        password: '1',
       
    }
]);

db.courses.drop();

db.courses.insert([
    {
      _id: 'course1',
      account_id: 'luqanuhos@mailinator.com',
      code: 'CS101',
      name: 'Introduction to Computer Science',
      description: 'An introductory course to Computer Science fundamentals.',
      imageUrl: '/images/homeImg.jpg'
    },
    {
        _id: 'course2', 
        account_id: 'jamesmcdonald@gmail.com',
        code: 'CS102', 
        name: 'Advanced Topics in Computer Science',
        description: 'A course on advanced topics in Computer Science.',
        imageUrl: '/images/homeImg2.jpg'
      }
]);
  