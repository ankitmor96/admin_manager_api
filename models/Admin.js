import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    confirmPasseord:{
      type:String,
      trim:true
    },
    status: {
      type: Boolean,
      default: true
    },
    created_date: {
      type: String,
      required: true
    },
    updated_date: {
      type: String,
      required: true
    }
  },
  {
    timestamps:true
  }
);

adminSchema.pre("save", async function () {

    const admin = this;

    if (admin.isModified("password")) {
        admin.password = await bcrypt.hash(admin.password, 10);
    }

});



adminSchema.statics.findByCredentials = async function (email, password) {

    const admin = await this.findOne({ email });

    if (!admin) {
        throw new Error("unable to login");
    }

    const isModified = await bcrypt.compare(password, admin.password);

    if (!isModified) {
        throw new Error("unable to login");
    }

    return user;

};

adminSchema.methods.generateAuthToken = async function () {

    try {
        const admin = this;

        const token = jwt.sign(
            { _id: this._id.toString() },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            },
        );

        if (!token) {
            throw new Error(" auth token not found");
        }

        console.log(token);

        admin.tokens = admin.tokens.concat({ token });

        await admin.save();

        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};

adminSchema.methods.toJSON = function () {
    try {

        const admin = this;

        const adminObject = admin.toObject();

        delete adminObject.password;

        delete adminObject._id;

        delete adminObject.createdAt;

        delete adminObject.updatedAt;

        delete adminObject.__v;

        return adminObject;


    } catch (error) {
        throw new Error(error.message);
    }
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;