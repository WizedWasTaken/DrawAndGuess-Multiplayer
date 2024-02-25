import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Indtast et brugernavn',
  },
  password: {
    type: String,
    required: 'Indtast en adgangskode',
  },
  created_date: {
    type: Date,
    default: Date.now,
  },

  // DATA TIL STATISTIKKER
  favorite_snail: {
    type: String,
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
});

// Altid krypter password før det gemmes i databasen
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

// Metode på bruger modellen som kan sammenligne passwords
userSchema.methods.comparePassword = async function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export const userModel = mongoose.model('User', userSchema);
