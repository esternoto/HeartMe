import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    error: {
        fontSize: 11,
        color:'red',
        textAlign:'left',
        marginLeft: 12,
        margin:-7,
    },
    button: {
        marginBottom: 14,
        height: 45,
        width: 190,
        backgroundColor: 'black',
        borderRadius: 4,
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 12,
    },
    title: {
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
    },
    goodImage: {
        width: 155,
        height: 130,
    },
    badImage: {
        width: 150,
        height: 112,
    },
    unknownImage: {
        width: 150,
        height: 140,
    },
});
