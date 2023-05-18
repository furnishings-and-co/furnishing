const client = require('./client');
const { createProduct } = require('./products');
const { createUser } = require('./users');

const dropTables = async () => {
  try {
    console.log('Starting to drop all tables...');
    await client.query(`
    DROP TABLE IF EXISTS purchased_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `);
    console.log('Finished droppping all tables successfully!');
  } catch (error) {
    console.error('Error dropping tables');
    throw error;
  }
};

async function createTables() {
  // create all tables, in the correct order
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT FALSE
      );
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        price DECIMAL NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        picture TEXT NOT NULL
      );
      CREATE TABLE purchased_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        price DECIMAL(10, 2),
        description TEXT NOT NULL,
        picture TEXT NOT NULL,
        "userId" INTEGER REFERENCES users (id),
        "productId" INTEGER REFERENCES products (id)
      );
    `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { username: "albert", password: "bertie99", isAdmin: false },
      { username: "sandra", password: "sandra123", isAdmin: false },
      { username: "glamgal", password: "glamgal123", isAdmin: false },
      { username: "admin", password: "admin123", isAdmin: true }
    ]
    const users = await Promise.all(usersToCreate.map(createUser))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!")
    throw error
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...")

    const productsToCreate = [
      {
        name: "ElegentErgo",
        description: "Wooden grey chair.",
        price: 227.24,
        picture: "/img/chair1.webp",
        category: "chair"

      },
      {
        name: "CozyCushion",
        description: "Plush fabric armchair with extra cushioning.",
        price: 349.99,
        picture: "/img/chair2.jpg",
        category: "chair"
      },

      {
        name: "SleekLeather",
        description: "Black leather recliner chair with adjustable headrest.",
        price: 599.99,
        picture: "/img/chair3.webp",
        category: "chair"
      },

      {
        name: "Mid-CenturyMarvel",
        description: "Iconic mid-century modern chair in vibrant colors.",
        price: 299.99,
        picture: "/img/chair4.webp",
        category: "chair"
      },

      {
        name: "RusticRocking",
        description: "Handcrafted wooden rocking chair with a rustic finish.",
        price: 179.99,
        picture: "/img/chair5.webp",
        category: "chair"
      },

      {
        name: "ContemporaryChic",
        description: "Sleek and stylish chair with metal frame and minimalist design.",
        price: 249.99,
        picture: "/img/chair6.jpg",
        category: "chair"
      },

      {
        name: "BohemianBreeze",
        description: "Bohemian-inspired woven rattan chair with a comfortable cushion.",
        price: 199.99,
        picture: "/img/chair7.jpg",
        category: "chair"
      },

      {
        name: "VersatileVanity",
        description: "Elegant vanity chair with a padded seat and mirrored accents.",
        price: 129.99,
        picture: "/img/chair8.webp",
        category: "chair"
      },

      {
        name: "IndustrialIron",
        description: "Sturdy industrial-style chair with metal frame and distressed finish.",
        price: 179.99,
        picture: "/img/chair9.webp",
        category: "chair"
      },

      {
        name: "LuxeLounge",
        description: "Luxurious velvet lounge chair with a tufted backrest and gold accents.",
        price: 499.99,
        picture: "/img/chair10.webp",
        category: "chair"
      },
      {
        name: "Grey Bliss",
        description: "Grey sectional Couch",
        price: 294.94,
        picture: "/img/couch1.webp",
        category: "couch"
      },
      {
        name: "Grey Bliss",
        description: "Grey sectional Couch",
        price: 294.94,
        picture: "/img/couch1.webp",
        category: "couch"
      },
      {
        name: "Modern Minimalist",
        description: "Sleek and minimalist white leather couch with clean lines.",
        price: 599.99,
        picture: "/img/couch2.webp",
        category: "couch"
      },
      {
        name: "Vintage Velvet",
        description: "Elegant burgundy velvet couch with tufted details and wooden legs.",
        price: 799.99,
        picture: "/img/couch3.webp",
        category: "couch"
      },
      {
        name: "Coastal Retreat",
        description: "Beige linen couch with a relaxed coastal vibe and comfortable cushions.",
        price: 499.99,
        picture: "/img/couch4.webp",
        category: "couch"
      },
      {
        name: "Midnight Blue",
        description: "Deep blue velvet couch with a luxurious feel and button-tufted backrest.",
        price: 899.99,
        picture: "/img/couch5.webp",
        category: "couch"
      },
      {
        name: "Convertible Charmer",
        description: "Multifunctional gray couch that easily transforms into a comfortable sleeper sofa.",
        price: 699.99,
        picture: "/img/couch6.webp",
        category: "couch"
      },
      {
        name: "Rustic Retreat",
        description: "Distressed leather couch with a weathered look and cozy oversized cushions.",
        price: 1299.99,
        picture: "/img/couch7.jpg",
        category: "couch"
      },
      {
        name: "Chic Chesterfield",
        description: "Classic chesterfield-style couch in light gray with elegant button-tufting.",
        price: 899.99,
        picture: "/img/couch8.jpg",
        category: "couch"
      },
      {
        name: "Contemporary Comfort",
        description: "Modern gray couch with adjustable headrests and built-in cup holders.",
        price: 799.99,
        picture: "/img/couch9.webp",
        category: "couch"
      },
      {
        name: "Bold and Beautiful",
        description: "Vibrant red fabric couch with a bold design and plush cushioning.",
        price: 599.99,
        picture: "/img/couch10.jpg",
        category: "couch"
      },
      {
        name: "Standard Lamp",
        description: "Really Really Bright",
        price: 50.99,
        picture: "/img/light1.jpg",
        category: "light"
      },
      {
        name: "Elegant Chandelier",
        description: "Crystal chandelier with intricate design and sparkling lights.",
        price: 299.99,
        picture: "/img/light2.jpg",
        category: "light"
      },
      {
        name: "Industrial Floor Lamp",
        description: "Tall floor lamp with exposed bulbs and metal construction for an industrial look.",
        price: 129.99,
        picture: "/img/light3.jpg",
        category: "light"
      },
      {
        name: "Modern Table Lamp",
        description: "Minimalist table lamp with a sleek design and touch-sensitive controls.",
        price: 79.99,
        picture: "/img/light4.jpg",
        category: "light"
      },
      {
        name: "Vintage Desk Lamp",
        description: "Antique-inspired desk lamp with a brass finish and adjustable arm.",
        price: 89.99,
        picture: "/img/light5.jpg",
        category: "light"
      },
      {
        name: "Tiffany Style Lamp",
        description: "Stained glass lamp with vibrant colors and intricate patterns.",
        price: 199.99,
        picture: "/img/light6.jpg",
        category: "light"
      },
      {
        name: "Modern Pendant Light",
        description: "Sleek and contemporary pendant light with a matte black finish.",
        price: 149.99,
        picture: "/img/light7.jpg",
        category: "light"
      },
      {
        name: "Rustic Lantern",
        description: "Rustic lantern-style lamp with a wooden frame and soft ambient lighting.",
        price: 79.99,
        picture: "/img/light8.jpg",
        category: "light"
      },
      {
        name: "Glamorous Sconce",
        description: "Glamorous wall sconce with crystal accents and a shimmering gold finish.",
        price: 129.99,
        picture: "/img/light9.jpg",
        category: "light"
      },
      {
        name: "Artistic Floor Lamp",
        description: "Unique floor lamp with a sculptural design and artistic flair.",
        price: 199.99,
        picture: "/img/light10.jpg",
        category: "light"
      },
      {
        name: "Sleek Bedside Table",
        description: "Sleek bedside table with a contemporary design and convenient storage drawers.",
        price: 99.99,
        picture: "/img/table1.jpg",
        category: "table"
      },
      {
        name: "Elegant Dining Table",
        description: "Large dining table with a beautiful wooden finish and intricate carvings.",
        price: 899.99,
        picture: "/img/table2.jpg",
        category: "table"
      },
      {
        name: "Modern Glass Coffee Table",
        description: "Sleek coffee table with a glass top and minimalist metal frame.",
        price: 249.99,
        picture: "/img/table3.jpg",
        category: "table"
      },
      {
        name: "Vintage Console Table",
        description: "Antique-inspired console table with ornate details and a distressed finish.",
        price: 349.99,
        picture: "/img/table4.jpg",
        category: "table"
      },
      {
        name: "Industrial-Style Desk",
        description: "Sturdy desk with a rustic industrial look and ample storage space.",
        price: 499.99,
        picture: "/img/table5.jpg",
        category: "table"
      },
      {
        name: "Contemporary Side Table",
        description: "Modern side table with a unique geometric design and a marble top.",
        price: 179.99,
        picture: "/img/table6.jpg",
        category: "table"
      },
      {
        name: "Farmhouse Dining Table",
        description: "Charming farmhouse-style dining table with a reclaimed wood look.",
        price: 699.99,
        picture: "/img/table7.webp",
        category: "table"
      },
      {
        name: "Glamorous Vanity Table",
        description: "Glamorous vanity table with a mirrored surface and elegant design.",
        price: 349.99,
        picture: "/img/table8.webp",
        category: "table"
      },
      {
        name: "Minimalist Writing Desk",
        description: "Minimalist writing desk with clean lines and a spacious work area.",
        price: 299.99,
        picture: "/img/table9.webp",
        category: "table"
      },
      {
        name: "Versatile Folding Table",
        description: "Versatile folding table that can be easily stored and set up for various purposes.",
        price: 129.99,
        picture: "/img/table10.jpg",
        category: "table"
      },

    ]
    const products = await Promise.all(productsToCreate.map(createProduct))

    console.log("products created:")
    console.log(products)

    console.log("Finished creating products")
  } catch (error) {
    console.error("Error creating products")
    throw error
  }
}
const rebuildDB = async () => {
  try {
    await dropTables();
    console.log("dropped tables")
    await createTables();
    console.log("created tables")
    await createInitialUsers();
    console.log("createdUsers tables")
    await createInitialProducts();
    console.log("createdProducts tables")
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    await client.end();
    console.log("Database has been rebuilt, and you're good to go!");
  }
};

rebuildDB();
