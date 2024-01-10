import numpy as np
import os
from os import listdir
import PIL
import PIL.Image
import tensorflow as tf
from tensorflow.keras.layers.experimental.preprocessing import Rescaling
import matplotlib.pyplot as plt
import cv2

from keras import layers
import keras
from keras.preprocessing import image
from keras.preprocessing.image import img_to_array

batch_size = 32
img_height = 180
img_width = 180
default_image_size = tuple((256, 256))
data_dir = './plant_village_dataset'

ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    seed=123,
    batch_size=batch_size,
    color_mode="grayscale",
    image_size=(img_height, img_width),
)

ds_size = tf.data.experimental.cardinality(ds).numpy()
print(ds_size)


def get_dataset_partitions_tf(ds, ds_size, train_split=0.8, val_split=0.1, test_split=0.1, shuffle=True, shuffle_size=10000):
    assert (train_split + test_split + val_split) == 1

    if shuffle:
        ds = ds.shuffle(shuffle_size, seed=123)

    train_size = int(train_split * ds_size)
    val_size = int(val_split * ds_size)

    train_ds = ds.take(train_size)
    val_ds = ds.skip(train_size).take(val_size)
    test_ds = ds.skip(train_size).skip(val_size)

    return train_ds, val_ds, test_ds


train_ds, val_ds, test_ds = get_dataset_partitions_tf(ds, ds_size)

class_names = ds.class_names
print(class_names)

train_size = tf.data.experimental.cardinality(train_ds).numpy()
test_size = tf.data.experimental.cardinality(test_ds).numpy()
val_size = tf.data.experimental.cardinality(val_ds).numpy()
print(train_size, test_size, val_size)

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

flipped_train = train_ds.concatenate(train_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y)))
flipped_test = test_ds.concatenate(test_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y)))

data_augmentation = keras.Sequential([
    layers.RandomFlip("vertical"),
])

flipped_train = train_ds.concatenate(train_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y)))
flipped_test = test_ds.concatenate(test_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y)))

data_augmentation = keras.Sequential([
    layers.RandomFlip("horizontal_and_vertical"),
])

flipped_train = train_ds.concatenate(train_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y)))
flipped_test = test_ds.concatenate(test_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y)))

plt.figure(figsize=(10, 10))
for images, labels in flipped_train.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(images[i].numpy().astype("uint8"), cmap="Greys_r")
        plt.title(class_names[labels[i]])
        plt.axis("off")

for image_batch, labels_batch in flipped_train:
    print(image_batch.shape)
    print(labels_batch.shape)
    break

train_ds_size = tf.data.experimental.cardinality(train_ds).numpy()

flipped_ds_size = tf.data.experimental.cardinality(flipped_train).numpy()

print(f"Original dataset size: {train_ds_size}")
print(f"Augmented dataset size: {flipped_ds_size}")


def add_salt_and_pepper_noise(image, salt_prob=0.2, pepper_prob=0.2):
    noisy_image = tf.identity(image)
    salt_mask = tf.random.uniform(tf.shape(image)) < salt_prob
    noisy_image = tf.where(salt_mask, 1.0, noisy_image)
    pepper_mask = tf.random.uniform(tf.shape(image)) < pepper_prob
    noisy_image = tf.where(pepper_mask, 0.0, noisy_image)

    return noisy_image


noisy_train = train_ds.map(lambda x, y: (add_salt_and_pepper_noise(x), y))
noisy_train = noisy_ds.concatenate(train_ds)

noisy_test = test_ds.map(lambda x, y: (add_salt_and_pepper_noise(x), y))
noisy_test = noisy_test.concatenate(test_ds)

noisy_ds_size = tf.data.experimental.cardinality(noisy_train).numpy()
print(f"Salt and Pepper Augmented dataset size: {noisy_ds_size}")

plt.figure(figsize=(10, 10))
for images, labels in noisy_train.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(images[i].numpy().astype("uint8"), cmap="Greys_r")
        plt.title(class_names[labels[i]])
        plt.axis("off")
