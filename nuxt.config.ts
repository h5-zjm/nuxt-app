// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // css:['~/assets/css/main.css'],
  app:{
    head:{
        link:[{
            rel:'stylesheet',
            href:'./assets/css/main.css',
        }],
        charset:'utf-8',
        title:'my test nuxt',
        meta:[{
            name:"description",content:'2222'
        }]
    }
  },

  // nitro:{
  //   storage:{
  //       redis:{
  //           driver:'redis',
  //           port:6379,
  //           host:'127.0.0.1',
  //           password:'',
  //           db:0
  //       }
  //   }
  // }
  runtimeConfig:{
    apiKey:'1234',
      public:{
        apiBase:'test.com'
      },
      redis:{
        host:'',
          port:0
      },
      bcrypt:{
        saltRounds:10,
      },
      jwt:{
        secret:'',
          expiresIn:60*60
      }
  },
    modules: ['@nuxt/ui']
})
