import numpy as np
import os
import PIL
import PIL.Image
import tensorflow as tf
from tensorflow.keras.layers.experimental.preprocessing import Rescaling
import matplotlib.pyplot as plt
import cv2

from keras import layers
import keras

batch_size = 32
img_height = 180
img_width = 180
data_dir = './plant_village_dataset'

train_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="training",
    seed=123,
    batch_size=batch_size,
    color_mode="grayscale",
    image_size=(img_height, img_width),
)

val_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="validation",
    seed=123,
    batch_size=batch_size,
    color_mode="grayscale",
    image_size=(img_height, img_width),
)

class_names = train_ds.class_names
print(class_names)
train_ds

plt.figure(figsize=(10, 10))
for images, labels in train_ds.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(images[i].numpy().astype("uint8"), cmap="Greys_r")
        plt.title(class_names[labels[i]])
        plt.axis("off")


def tf_equalize(image):
    values_range = tf.constant([0., 255.], dtype=tf.float32)
    histogram = tf.histogram_fixed_width(image, values_range, 256)
    histogram = tf.cast(histogram, tf.float32)
    cdf = tf.cumsum(histogram)
    cdf = cdf / tf.reduce_sum(cdf)
    px_map = 255.0 * (cdf / tf.reduce_max(cdf))
    px_map = tf.cast(px_map, tf.uint8)

    image_flat = tf.reshape(image, [-1])
    indices = tf.cast(image_flat, tf.int32)
    eq_hist_flat = tf.gather(px_map, indices)
    eq_hist = tf.reshape(eq_hist_flat, tf.shape(image))
    eq_hist = tf.cast(eq_hist, tf.float32)

    return eq_hist


train_ds = train_ds.map(lambda x, y: (tf_equalize(x), y))

plt.figure(figsize=(10, 10))
for images, labels in train_ds.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(images[i].numpy().astype("uint8"), cmap="Greys_r")
        plt.title(class_names[labels[i]])
        plt.axis("off")

for image_batch, labels_batch in train_ds:
    print(image_batch.shape)
    print(labels_batch.shape)
    break

data_augmentation = keras.Sequential([
    layers.RandomFlip("horizontal"),
])

train1 = train_ds.concatenate(train_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y)))

data_augmentation = keras.Sequential([
    layers.RandomFlip("vertical"),
])

train1 = train1.concatenate(train_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y)))

data_augmentation = keras.Sequential([
    layers.RandomFlip("horizontal_and_vertical"),
])

train1 = train1.concatenate(train_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y)))

plt.figure(figsize=(10, 10))
for images, labels in train1.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(images[i].numpy().astype("uint8"), cmap="Greys_r")
        plt.title(class_names[labels[i]])
        plt.axis("off")

for image_batch, labels_batch in train1:
    print(image_batch.shape)
    print(labels_batch.shape)
    break

train_ds_size = tf.data.experimental.cardinality(train_ds).numpy()

train1_size = tf.data.experimental.cardinality(train1).numpy()

print(f"Original dataset size: {train_ds_size}")
print(f"Augmented dataset size: {train1_size}")


def add_salt_and_pepper_noise(image, salt_prob=0.2, pepper_prob=0.2):
    noisy_image = tf.identity(image)
    salt_mask = tf.random.uniform(tf.shape(image)) < salt_prob
    noisy_image = tf.where(salt_mask, 1.0, noisy_image)
    pepper_mask = tf.random.uniform(tf.shape(image)) < pepper_prob
    noisy_image = tf.where(pepper_mask, 0.0, noisy_image)

    return noisy_image


train2 = train_ds.map(lambda x, y: (add_salt_and_pepper_noise(x), y))
train2 = train2.concatenate(train_ds)

train2_size = tf.data.experimental.cardinality(train2).numpy()
print(f"Salt and Pepper Augmented dataset size: {train2_size}")

plt.figure(figsize=(10, 10))
for images, labels in train2.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(images[i].numpy().astype("uint8"), cmap="Greys_r")
        plt.title(class_names[labels[i]])
        plt.axis("off")
