'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        title: "Anything goes!",
        name: "anythinggoes",
        description: "If none of your ideas fit our labels, you're doing it right. New ideas are always welcome here."
      },
      {
        title: "Entertain me!",
        name: "entertainme",
        description: "Movies, art, books, etc. that you simply must witness before you die."
      },
      {
        title: "It's never too late!",
        name: "itsnevertoolate",
        description: "Don't be shy. Let's talk about our feelings. Get it off your chest while you're still alive."
      },
      {
        title: "Let's get wild!",
        name: "letsgetwild",
        description: "This is for the unwell. The ultimate adrenaline junkie. The ultimate buck it, if you will."
      },
      {
        title: "X marks the spot!",
        name: "xmarksthespot",
        description: "Breathtaking stops along the journey that is life. Enjoy the world before you reach the final destination that is death."
      },
      {
        title: "Yummy!",
        name: "yummy",
        description: "Calling all foodies! From five star cuisines to your grandma's peach cobbler, give us dishes that are to die for."
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};
