import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    TextInput
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';



export default class PartnerEdit extends Component {

    constructor(props) {
        super(props)
        this.uploadImage = this.uploadImage.bind(this);
        this.setValue = this.setValue.bind(this);

        this.state = {
            project: {
                id: this.props.route.params.project[0].id,
                name: this.props.route.params.project[0].title,
                details: this.props.route.params.project[0].detail,
                address: this.props.route.params.project[0].address,
                city: this.props.route.params.project[0].city,
                district: this.props.route.params.project[0].district,
                activity_year: this.props.route.params.project[0].activity_year,
                brief: this.props.route.params.project[0].brief,
                industry: this.props.route.params.project[0].industry,
                files: this.props.route.params.project[0].files,

            },
            // DropDown
            open: false,
            value: null,
            items: [
                { label: '1000 TL ve daha az', value: '1000 TL ve daha az', },
                { label: '1000-10000', value: '1000-10000', },
                { label: '100001-50000 ', value: '100001-50000', },
                { label: '50001-100000 ', value: '50001-100000', },
                { label: '100001 ve daha fazla ', value: '100001 ve daha fazla', },
            ]
        };

    }

    componentDidMount(){
    
    }

    // DropDown
    setOpen = (open) => {
        this.setState({
            open
        });
    }

    setValue = (callback) => {

        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems = (callback) => {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }

    //IMAGE 
    uploadImage = () => {
        const options = {
            quality: 1.0,
            mediaType: 'photo',

            includeBase64: true,
        };
        launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('project cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('project tapped custom button: ', response.customButton);
            }
            else {
                this.setState({ image: response })

            }

        })

    }
    EditProjectButton = () => {

        if (this.state.value === "") {
            alert("Tutar boş olamaz!")
        }
        else {
        if (this.state.image) {
            axios.put('http://192.168.1.101/partner_project_backend/partner_edit_photo.php',
                {

                  id: this.state.project.id,
                  title: this.state.project.name,
                  details: this.state.project.details,
                  address: this.state.project.address,
                  annual_earning: this.state.value,
                  city: this.state.project.city,
                  district: this.state.project.district,
                  brief: this.state.project.brief,
                  industry: this.state.project.industry,
                  activity_year: this.state.project.activity_year,
                  image: this.state.image


                })

                .then((response) => {
                    if (response.data === "Success") {
                        alert("Güncellendi");
                    }
                    else{
                        alert("Bir hatayla karşılaşıldı. Bilgileri Kontrol ediniz");
                    }
                  
                  })
                .catch((error) => {
                    console.error(error);
                });




        }
        else {
            axios.put('http://192.168.1.101/partner_project_backend/partner_edit.php',
                {
                  id: this.state.project.id,
                  title: this.state.project.name,
                  details: this.state.project.details,
                  address: this.state.project.address,
                  annual_earning: this.state.value,
                  city: this.state.project.city,
                  district: this.state.project.district,
                  brief: this.state.project.brief,
                  industry: this.state.project.industry,
                  activity_year: this.state.project.activity_year,
                 
                
                

                })

                .then((response) => {
                  if (response.data === "Success") {
                      alert("Güncellendi");
                 
                  }
                  else{
                      alert("Bir hatayla karşılaşıldı. Bilgileri Kontrol ediniz");
                  }
                console.log('====================================');
                console.log(response.data);
                console.log('====================================');
                
                })
              .catch((error) => {
                  console.error(error);
              });


        }
    }



    }




    render() {
        const { open, value, items } = this.state;
        StatusBar.setBarStyle('light-content', true);
        return (

            <SafeAreaView style={[styles.container]}>

                <TouchableOpacity title="Go to Home"
                    onPress={() => { this.props.navigation.navigate('ProfileScreen') }} >

                    <Ionicons name='arrow-back-outline' color={'white'} size={30}
                        style={{ marginTop: 20, color: 'black', paddingLeft: 12, fontSize: 18, fontWeight: 'bold', }}
                    >
                        Projeyi Güncelle </Ionicons>

                </TouchableOpacity>

                <ScrollView>

                    {/* Posts View */}
                    <View style={styles.postsView} >

                        {/* {posts.map((post) => (
                    <Post post={post} />
                  ))} */}
                        <View style={styles.postView} >
                            {/* Post Header */}
                            <View style={styles.postHeader}>

                                <View style={{ flex: 1, paddingHorizontal: 0 }}>


                                </View>



                            </View>
                            {/* Post Content */}
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ marginTop: 20 }}>
                                    <Text>Proje İsmi</Text>
                                    <TextInput
                                        placeholder={this.state.project.name}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(projectname) => this.state.project.name = projectname}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>Adres</Text>
                                    <TextInput
                                        placeholder={this.state.project.address}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(address) => this.state.project.address = address}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>İl</Text>
                                    <TextInput
                                        placeholder={this.state.project.city}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(city) => this.state.project.city = city}
                                    />
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    <Text>İlçe</Text>
                                    <TextInput
                                        placeholder={this.state.project.district}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(district) => this.state.project.district = district}
                                    />
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ marginBottom: 10 }} >Yıllık Kazanılan Tutar</Text>
                                    <DropDownPicker
                                        style={styles.dropDownContainerStyle}

                                        open={open}
                                        value={value}
                                        items={items}
                                        setOpen={this.setOpen}
                                        setValue={this.setValue}
                                        setItems={this.setItems}

                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ marginBottom: 10 }} >Faaliyet Yılı/Yılları</Text>
                                    <TextInput
                                        placeholder={this.state.project.activity_year}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(activity_year) => this.state.project.activity_year = activity_year}
                                    />
                                   
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ marginBottom: 10 }} >Sektör</Text>
                                    <TextInput
                                        placeholder={this.state.project.industry}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(industry) => this.state.project.industry = industry}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>Özet</Text>
                                    <TextInput
                                        placeholder={this.state.project.brief}
                                        placeholderTextColor='black'
                                        style={styles.input}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(brief) => this.state.project.brief = brief}
                                    />
                                </View>
                               
                                <View style={{ marginTop: 10 }}>
                                    <Text>Açıklama</Text>
                                    <TextInput
                                        placeholder={this.state.project.details}
                                        placeholderTextColor='black'
                                        style={styles.biginput}
                                        autoCorrect={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(details) => this.state.project.details = details}
                                    />
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <TouchableOpacity style={styles.input}
                                        title="Go to Details"
                                        onPress={this.uploadImage}
                                    >
                                        <Text style={{
                                            marginBottom: 0, fontSize: 16, justifyContent: 'center',
                                            alignItems: 'center',
                                        }} >Fotoğraf Yükle</Text>

                                    </TouchableOpacity>

                                    {this.state.image ? (
                                        <Image
                                            style={{
                                                flex: 1, height: 300, width: '100%', resizeMode: 'contain', marginTop:10
                                            }}
                                            source={
                                               this.state.image 
                                            }
                                        />
                                    ) : null}


                                </View>



                                <TouchableOpacity style={styles.loginButton}
                                    title="Go to Details"
                                    onPress={this.EditProjectButton}
                                >
                                    <Text style={styles.loginButtonText}>Kaydet</Text>

                                </TouchableOpacity>


                            </View>



                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>




        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        color: '#fff',
        marginTop: 0

    },
    dropDownContainerStyle: {

        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '100%',
        height: 50,
        // backgroundColor: '#333',
        borderRadius: 6,
        marginTop: 0,
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'black',
    },
    ImageContainer: {
        borderRadius: 400 / 2,
        width: 100,
        height: 100,
        borderColor: '#9B9B9B',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    projectCardRight: {
        marginRight: 0
    },

    projectProfileImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },

    showAllText: {
        color: '#c1c1c1',
        fontSize: 18,
    },

    storyprojectProfileImage: { width: 60, height: 60, borderRadius: 100 },
    postsView: { paddingHorizontal: 10, marginTop: 10 },
    postView: {
        paddingVertical: 20,
        // backgroundColor: '#247BA0',

        // shadowColor: '#1e1e1e',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        paddingTop: 0,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 8,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 5
    },
    postStatsOpacity: {
        backgroundColor: '#222',
        padding: 8,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        paddingLeft: 10,
        marginBottom: 10,
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,

    },
    loginButton: {
        backgroundColor: '#911b2c',
        paddingVertical: 12,
        borderRadius: 6,
        marginTop: 25,
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fafafa',
        alignSelf: 'center',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '100%',
        height: 50,
        // backgroundColor: '#333',
        borderRadius: 6,
        marginTop: 0,
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'black',
    },
    biginput: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '100%',
        height: 150,
        // backgroundColor: '#333',
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'black',
    },
});