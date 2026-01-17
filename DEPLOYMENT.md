# MIBCS Website Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Local Development Setup

1. **Clone and Setup**
   ```bash
   # Make setup script executable
   chmod +x setup.sh
   
   # Run setup script
   ./setup.sh
   ```

2. **Manual Setup (if script fails)**
   ```bash
   # Install dependencies
   npm run install-all
   
   # Setup environment files
   cp server/.env.example server/.env
   # Edit server/.env with your settings
   
   # Seed database
   cd server && node scripts/seedDatabase.js && cd ..
   ```

3. **Start Development Servers**
   ```bash
   npm run dev
   ```

   This starts both:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Admin Access
- URL: http://localhost:3000/admin/login
- Email: admin@mibcs.com
- Password: admin123

## 🌐 Production Deployment

### Frontend (Vercel)

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy from client directory
   cd client
   vercel --prod
   ```

3. **Environment Variables on Vercel**
   - `REACT_APP_API_URL`: Your backend API URL

### Backend (Render/Railway/Heroku)

1. **Prepare for deployment**
   ```bash
   # Ensure all dependencies are in package.json
   cd server
   npm install --production
   ```

2. **Environment Variables**
   Set these in your hosting platform:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=7d
   ADMIN_EMAIL=admin@mibcs.com
   ADMIN_PASSWORD=your-secure-password
   CLIENT_URL=https://your-frontend-url.vercel.app
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

3. **Deploy Commands**
   - Build: `npm install`
   - Start: `npm start`

### Database (MongoDB Atlas)

1. **Create MongoDB Atlas Cluster**
   - Go to https://cloud.mongodb.com
   - Create a new cluster
   - Get connection string

2. **Update Environment**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mibcs
   ```

3. **Seed Production Database**
   ```bash
   # Run seeding script with production URI
   MONGODB_URI=your-production-uri node server/scripts/seedDatabase.js
   ```

## 🔧 Configuration

### Environment Variables

#### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mibcs
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d

# Admin Credentials
ADMIN_EMAIL=admin@mibcs.com
ADMIN_PASSWORD=admin123

# CORS
CLIENT_URL=http://localhost:3000

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### MongoDB Setup

#### Local MongoDB
```bash
# Install MongoDB (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb/brew/mongodb-community

# Or start manually
mongod --config /usr/local/etc/mongod.conf
```

#### MongoDB Atlas (Cloud)
1. Create account at https://cloud.mongodb.com
2. Create new cluster
3. Add database user
4. Whitelist IP addresses
5. Get connection string

## 📊 Analytics Setup

### Google Analytics (Optional)
1. Create GA4 property
2. Add tracking ID to client environment
3. Update analytics configuration in client

### Custom Analytics
The app includes built-in analytics for:
- Event page views
- Registration button clicks
- Contact form submissions

## 🔒 Security Considerations

### Production Security
1. **Change default admin password**
2. **Use strong JWT secret**
3. **Enable HTTPS**
4. **Set up proper CORS**
5. **Use environment variables for secrets**
6. **Regular security updates**

### Rate Limiting
The API includes rate limiting (100 requests per 15 minutes per IP)

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string
   - Check network connectivity

2. **CORS Errors**
   - Update CLIENT_URL in server environment
   - Check frontend API URL configuration

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **Authentication Issues**
   - Check JWT secret configuration
   - Verify admin credentials
   - Clear browser localStorage

### Logs and Debugging
- Server logs: Check console output
- Client logs: Check browser developer tools
- Database logs: Check MongoDB logs

## 📈 Performance Optimization

### Frontend
- Image optimization
- Code splitting
- Lazy loading
- CDN for static assets

### Backend
- Database indexing
- Query optimization
- Caching strategies
- Compression middleware

## 🔄 Updates and Maintenance

### Regular Tasks
1. Update dependencies
2. Monitor performance
3. Backup database
4. Review security
5. Update content

### Backup Strategy
```bash
# MongoDB backup
mongodump --uri="your-mongodb-uri" --out=backup-$(date +%Y%m%d)

# Restore
mongorestore --uri="your-mongodb-uri" backup-folder/
```

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review error logs
3. Check GitHub issues
4. Contact development team

---

**Happy Deploying! 🚀**