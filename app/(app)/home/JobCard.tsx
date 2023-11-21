
import { Avatar, Card, Chip, Icon, Text } from 'react-native-paper'
import { View } from 'react-native'
import moment from 'moment'
import { Job } from '../../../types/job'
import { router } from 'expo-router'

type Props = {
    item : Job
}

export default function JobCard(props : Props) {
    return (<Card style={{
        marginBottom: 20
    }}
    onPress={() => {
        router.push({
            pathname: '/(app)/job',
            params: { data : JSON.stringify(props.item)}
        });
    }}
    >
        <Card.Title titleStyle={{
            fontSize: 18,
            fontWeight: 'bold'
        }} title={props.item.title} left={props => <Avatar.Icon size={50} icon='post-outline' />} />
        <Card.Content>
            <Text style={{}}>{props.item.description.slice(0, 50)}...</Text>
            <View style={{
                marginVertical: 10,
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>


                <Chip>{props.item.skills}</Chip>
            </View>

            <View style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>

                <View>
                    <Text><Icon source={'account'} size={18} /> {props.item.createdByName}</Text>
                    <Text><Icon source={'map-marker'} size={18} /> {props.item.location}</Text>
                </View>

                <View>
                    <Text>{props.item.price ? `$ ${props.item.price}` : "Free"}</Text>
                    <Text><Icon source={'clock-time-three-outline'} size={18} /> {moment(props.item.created_at).fromNow()}</Text>
                </View>

            </View>


        </Card.Content>
    </Card>);
}