import numpy as np
import os
import PIL
import PIL.Image
import tensorflow as tf
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
    #     image_size=(img_height, img_width),
    batch_size=batch_size,
)

train_ds_size = tf.data.experimental.cardinality(train_ds).numpy()
print(f"Original dataset size: {train_ds_size}")

val_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="validation",
    seed=123,
    image_size=(img_height, img_width),
    batch_size=batch_size,
)

val_ds_size = tf.data.experimental.cardinality(val_ds).numpy()
print(f"Original dataset size: {val_ds_size}")

class_names = train_ds.class_names
print(class_names)

plt.figure(figsize=(10, 10))
for images, labels in train_ds.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(images[i].numpy().astype("uint8"))
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

    return eq_hist


equalized = train_ds.map(lambda x, y: (tf_equalize(x), y))

plt.figure(figsize=(10, 10))
for images, labels in equalized.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(images[i].numpy().astype("uint8"))
        plt.title(class_names[labels[i]])
        plt.axis("off")

for image_batch, labels_batch in train_ds:
    print(image_batch.shape)
    print(labels_batch.shape)
    break

data_augmentation = keras.Sequential([
    layers.RandomFlip("horizontal"),
])

aug_ds = train_ds.concatenate(train_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y)))

data_augmentation = keras.Sequential([
    layers.RandomFlip("vertical"),
])

aug_ds = aug_ds.concatenate(train_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y)))

data_augmentation = keras.Sequential([
    layers.RandomFlip("horizontal_and_vertical"),
])

aug_ds = aug_ds.concatenate(train_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y)))

plt.figure(figsize=(10, 10))
for images, labels in aug_ds.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(images[i].numpy().astype("uint8"))
        plt.title(class_names[labels[i]])
        plt.axis("off")

for image_batch, labels_batch in aug_ds:
    print(image_batch.shape)
    print(labels_batch.shape)
    break

train_ds_size = tf.data.experimental.cardinality(train_ds).numpy()

aug_ds_size = tf.data.experimental.cardinality(aug_ds).numpy()

print(f"Original dataset size: {train_ds_size}")
print(f"Augmented dataset size: {aug_ds_size}")
