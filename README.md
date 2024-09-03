# Pets Application Store

![architecture image](pets-architecture.png)

## Client

- File system 
```
/client
├── components                # reusable ui components
├── modules                   # functional modules of the app oriented to screaming architecture
│   ├── products              # product module
│   │   ├── components        # module specific components
│   │   ├── pages             # module specific pages
│   │   ├── actions           # server actions to perform server actions
│   │   ├── hooks             # module specific hooks
│   │   └── utils             # module specific utilities
│   │
│   ├── orders                # orders module
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── services
│   │   └── utils
│   │
│   └── users                 # users module
│       ├── components
│       ├── pages
│       ├── hooks
│       ├── services
│       └── utils
│
├── src
│   ├── api                   # Axios store configuration
│   ├── assets                # static files
│   ├── config                # Application configuration
│   └── app                   # root directory of th application
│
├── public                    # public static files
├── styles                    # global styles files
└── utils                     # helpers and general utilities
```

## Server

- File system 
```
/backend
├── app
│   ├── Core                  # 
│   │   ├── Contracts         # 
│   │   ├── Exceptions        # 
│   │   ├── Providers         # 
│   │   └── Events            # 
│   │
│   ├── Modules               # functional modules
│   │   ├── Products          # product modules
│   │   │   ├── Controllers   # specific controller of the module
│   │   │   ├── Models        # specific models
│   │   │   ├── Repositories  # data access repository
│   │   │   ├── Events        # module events
│   │   │   └── Listeners     # events listener
│   │   │
│   │   ├── Orders            # orders module
│   │   │   ├── Controllers
│   │   │   ├── Models
│   │   │   ├── Services
│   │   │   ├── Repositories
│   │   │   ├── Events
│   │   │   └── Listeners
│   │   │
│   │   └── Users             # users module
│   │       ├── Controllers
│   │       ├── Models
│   │       ├── Services
│   │       ├── Repositories
│   │       ├── Events
│   │       └── Listeners
│
├── bootstrap                 # Bootstrap for start application
├── config                    # general configurations
├── database                  # migrations, factories and seeders
├── routes                    # routes definition
│   ├── api.php               # api routes
│   └── web.php               # web routes
├── storage                   # logs and cache storage
└── tests                     # functional and unary test
```
## This project uses

- Backend: Laravel (PHP) with DDD Modular Architecture.
- Frontend: React with Next.js.
- Messaging/Events: Laravel Echo and Pusher for real-time updates.
- Images/Media: Cloudinary for image storage.
- Data Base: PostgreSQL.
- Cache: Redis for cache.
- Authentication: Laravel Passport or Sanctum for API authentication.

