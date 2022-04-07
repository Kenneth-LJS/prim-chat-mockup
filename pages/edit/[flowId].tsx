import React, { FunctionComponent, useState, useEffect } from 'react';
import ViewPage, { EditProps } from '../../components/pages/edit';
import clientPromise from '../../utils/mongodb'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const Page: FunctionComponent<EditProps> = ({ isConnected, data }) => {
    const router = useRouter();
    const { flowId } = router.query;

    return (
        <ViewPage isConnected={isConnected} data={data} flowId={flowId as string}/>
    );
};

export const getServerSideProps : GetServerSideProps = async (context) => {
    try {
        const flowId = context.params['flowId'];
        const client = await clientPromise;
        const db = client.db('prim');
        const document = await db.collection('flows').findOne({
            '_id': flowId
        });

        console.log(document.nodes)
        return {
            props: { 
                isConnected: true,
                data: {
                    nodes: document?.nodes || [],
                    edges: document?.edges || [],
                },
            }
        }
    } catch (e) {
        console.error(e)
        return {
            props: { 
                isConnected: false ,
            }
        }
    }
}

export default Page;
