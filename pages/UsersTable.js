import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import SearchBar from '../components/SearchBar';

export default function UsersTable({ route }) {
    const table = route.params.table;
    const [searchQuery, setSearchQuery] = useState("");
    // useEffect(() => console.log("\nuseEffect imta3 table", table), [])
    const [currentPage, setCurrentPage] = useState(1);
    const windowHeight = Dimensions.get('window').height;
    const itemsPerPage = (windowHeight - 300) / 50;

    const indexOfTheFirstItemInTheCurrentPage = (currentPage - 1) * itemsPerPage;
    const indexOfTheLastItemInTheCurrentPage = indexOfTheFirstItemInTheCurrentPage + itemsPerPage;

    const dataForCurrentPage = table.slice(indexOfTheFirstItemInTheCurrentPage, indexOfTheLastItemInTheCurrentPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <ScrollView pagingEnabled horizontal style={styles.container}>
            <View style={{ flex: 1 }}>
                <SearchBar value={searchQuery} onChange={(e) => { setCurrentPage(1); setSearchQuery(e); }} />
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.title}>Name</DataTable.Title>
                        <DataTable.Title style={styles.title}>lastName</DataTable.Title>
                        <DataTable.Title style={styles.title}>Email</DataTable.Title>
                        <DataTable.Title style={styles.title} numeric >PhoneNumber</DataTable.Title>
                        <DataTable.Title style={styles.title} numeric >Height</DataTable.Title>
                        <DataTable.Title style={styles.title}>Gender</DataTable.Title>
                        <DataTable.Title style={styles.title}>Job</DataTable.Title>
                        <DataTable.Title style={styles.title}>Health</DataTable.Title>

                    </DataTable.Header>
                    {!searchQuery ? dataForCurrentPage?.map(user => {
                        return (
                            <DataTable.Row key={user._id}>
                                <DataTable.Cell style={styles.cell}>{user?.firstName}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell} >{user?.lastName}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell} >{user?.email}</DataTable.Cell>
                                <DataTable.Cell numeric style={styles.cell}>{user?.phoneNumber}</DataTable.Cell>
                                <DataTable.Cell numeric style={styles.cell}>{user?.height + 'cm'}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell} >{user?.gender}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell} >{user?.job}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell} >{user?.health}</DataTable.Cell>

                            </DataTable.Row>)

                    }) : table.filter(user => {
                        return (
                            user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.height.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.gender.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.job.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.health.toString().toLowerCase().includes(searchQuery.toLowerCase())
                        )
                    }).slice(indexOfTheFirstItemInTheCurrentPage, indexOfTheLastItemInTheCurrentPage)
                        .map(user => {
                            return (
                                <DataTable.Row key={user._id}>
                                    <DataTable.Cell style={styles.cell}>{user?.firstName}</DataTable.Cell>
                                    <DataTable.Cell style={styles.cell} >{user?.lastName}</DataTable.Cell>
                                    <DataTable.Cell style={styles.cell} >{user?.email}</DataTable.Cell>
                                    <DataTable.Cell numeric style={styles.cell}>{user?.phoneNumber}</DataTable.Cell>
                                    <DataTable.Cell numeric style={styles.cell}>{user?.height + 'cm'}</DataTable.Cell>
                                    <DataTable.Cell style={styles.cell} >{user?.gender}</DataTable.Cell>
                                    <DataTable.Cell style={styles.cell} >{user?.job}</DataTable.Cell>
                                    <DataTable.Cell style={styles.cell} >{user?.health}</DataTable.Cell>

                                </DataTable.Row>)

                        })
                    }

                </DataTable>
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20, gap: 8 }}>
                    <Button
                        mode="contained"
                        onPress={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        mode="contained"
                        onPress={() => handlePageChange(currentPage + 1)}
                        disabled={indexOfTheLastItemInTheCurrentPage >= table.filter(user => {
                            return (
                                user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.height.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.gender.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.job.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.health.toString().toLowerCase().includes(searchQuery.toLowerCase())
                            )
                        }).length}
                    >
                        Next
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cell: {
        paddingHorizontal: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
