import mongoose from 'mongoose';

const { Schema } = mongoose;

const goalSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'please add a text value'],
    },
  },
  { timestamps: true }
);

const goalModel = mongoose.model('Goal', goalSchema);

export { goalModel };
