'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        first_name: "Michael",
        last_name: "Stanton",
        facebook_id: "1353563721328809",
        facebook_token: "EAADVsf9d6oQBAMZBZAZADLXwpAG5cPJ9WlPUwf6bbfx9cML74zbX7HcN46mVfmK6nJnnIZBgkkFw547W5kgojMvVFuOb3aKO0seSUTMujz2qNoZCtvQDcSApMfZCFpLtAADE95xMFBZCAMT47MRsg1UL5yQQOKAP9xuvZCuIhUcWdwZDZD",
        img_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/1480627_697875796897608_487704815_n.jpg?oh=b3c18c04484a0e0df1d90736d0f92dec&oe=58DBE0C8',
        bio: "Suspendisse tristique diam eget vestibulum iaculis. Aliquam vel varius lectus. Vestibulum rhoncus libero orci, sed gravida justo venenatis nec. Etiam nec sollicitudin urna.",
        instruments: ["Guitar", "Bass Guitar", "Drums", "Ukelele", "Banjo"],
        project_type: "Any",
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }, {
        id: 2,
        first_name: "Steven",
        last_name: "Wright",
        facebook_id: "130039564158772",
        facebook_token: "EAADVsf9d6oQBAORBEwIrZCEPBQukZBE2uJxCqxgtxnI4ZBD5nVujNRf8paMZBLRZBw1yNFIZCjbtfC72otLm4Yv7sJKAfU20h8STZBbYwZB9obgI9uCt92hZAAPtN5fHL7isLu8C87oWAXZCIpYH2vuiinPbi02NJXPEGhE7ugeJTFWgZDZD",
        img_url: "https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/15781471_130050020824393_3293511134944743591_n.jpg?oh=54da2e4efb15b5a181026e749fee476d&oe=58EF8BCB",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in risus leo. Suspendisse tristique diam eget vestibulum iaculis. Aliquam vel varius lectus.",
        instruments: ["Guitar", "Bass Guitar", "Drums"],
        project_type: "Any",
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};