import numpy as np
import os
import PIL
import PIL.Image
import tensorflow as tf

batch_size = 32
img_height = 180
img_width = 180
data_dir = './dataset'

train_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="training",
    seed=123)

val_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="validation",
    seed=123)

class_names = train_ds.class_names
print(class_names)