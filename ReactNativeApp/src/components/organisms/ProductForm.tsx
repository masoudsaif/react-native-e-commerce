import {useIsFocused} from '@react-navigation/native';
import {FC, memo, useEffect, useState} from 'react';
import React from 'react';
import {FlatList, Image, KeyboardAvoidingView, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

import useForm from '../../hooks/useForm';
import useProducts from '../../hooks/useProducts';
import {sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import {IImage, IProduct, IRouteProp} from '../../utility/constants/types';
import Icon from '../atoms/Icon';
import Input from '../atoms/Input';
import Typography from '../atoms/Typography';
import Button from '../molecules/Button';
import IconButton from '../molecules/IconButton';
import CollapsibleAlert from './CollapsibleAlert';

export interface IProductForm extends IRouteProp {}

const ProductForm: FC<IProductForm> = memo(({route}) => {
  const isFocused = useIsFocused();
  const product = route.params as IProduct | undefined;
  const {values, handleCreateHandler, handleResetForm} = useForm({
    name: product?.name || '',
    category: product?.category || '',
    description: product?.description || '',
    price: product?.price.toString() || '',
  });
  const [images, setImages] = useState<IImage[]>(
    product?.images.map(uri => ({uri, type: 'image/png', name: 'image.png'})) ||
      [],
  );
  const [error, setError] = useState<string>();
  const {insertProduct, updateProduct} = useProducts(setError);

  const handlePickerImage = (response: ImagePickerResponse) => {
    if (response.assets && response.assets.length) {
      const [asset] = response.assets;
      const temp = [...images];
      console.log(asset);
      temp.push({
        uri: asset.uri!,
        type: asset.type!,
        name: asset.fileName!,
      });

      setImages(temp);
    }
  };

  const handleRemoveImage = (index: number) => {
    const temp = [...images];
    temp.splice(index, 1);
    setImages(temp);
  };

  const handleImageLibrary = async () =>
    launchImageLibrary({quality: 0.5, mediaType: 'photo'}, response =>
      handlePickerImage(response),
    );

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('category', values.category);
    formData.append('description', values.description);
    formData.append('price', parseInt(values.price, 10));
    images.forEach(image => formData.append('images', image));

    product ? updateProduct(product._id, formData) : insertProduct(formData);
  };

  useEffect(() => {
    if (!isFocused && !product) {
      handleResetForm();
      setError(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
      style={[
        styles.flex,
        styles.screenHorizontalMargin,
        styles.screenHeaderPadding,
      ]}>
      <Typography
        fontColor="primaryFont"
        size="3xl"
        fontWeight="800"
        numberOfLines={1}>
        {product ? 'Update' : 'Add'} product
      </Typography>
      <Typography marginVertical={sizes.xxl}>
        Please {product ? 'update' : 'enter'} the product info.
      </Typography>
      <Input
        label="Name"
        value={values.name}
        onChangeText={handleCreateHandler('name')}
      />
      <Input
        label="Category"
        value={values.category}
        marginVertical={sizes.md}
        onChangeText={handleCreateHandler('category')}
      />
      <Input
        label="Price"
        keyboardType="number-pad"
        value={values.price}
        marginBottom={sizes.md}
        onChangeText={handleCreateHandler('price')}
      />
      <Input
        multiline
        label="Description"
        value={values.description}
        maxHeight={100}
        height={100}
        marginBottom={sizes['10xl']}
        onChangeText={handleCreateHandler('description')}
      />
      <Collapsible collapsed={images.length === 0}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="end"
          data={images}
          renderItem={({item: {uri}, index}) => (
            <View>
              <Image source={{uri}} style={styles.pickerImage} />
              <IconButton
                isMaterialIcon
                padding={0}
                name="delete"
                color="error"
                containerStyle={styles.absoluteRight}
                onPress={() => handleRemoveImage(index)}
              />
            </View>
          )}
        />
      </Collapsible>
      <Button
        size="small"
        marginTop={sizes.md}
        title="Upload Image"
        onPress={handleImageLibrary}
        endAdornment={<Icon name="add" color="white" />}
      />
      <CollapsibleAlert>{error}</CollapsibleAlert>
      <Button
        alignSelf="flex-end"
        marginTop={sizes.md}
        title="Submit"
        onPress={handleSubmit}
        endAdornment={
          <Icon
            name="ios-arrow-forward"
            color="white"
            style={styles.horizontalMargin}
          />
        }
      />
    </KeyboardAvoidingView>
  );
});

export default ProductForm;
