'use client'

import React, { useEffect, useState } from 'react';
import styles from './recentactivity.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Session } from '@/app/lib/types/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
    id: string;
    name: string;
    updatedAt: string;
    type: string;
    shareId: string;
}

interface DataProps {
    projects: Project[];
}

const ITEMS_PER_PAGE = 10;

const RecentActivity = () => {
    const [mainData, setMainData] = useState<DataProps>();
    const [currentPage, setCurrentPage] = useState(1);
    const { data: session } = useSession() as { data: Session };
    const router = useRouter();

    const totalPages = Math.ceil((mainData?.projects?.length || 0) / ITEMS_PER_PAGE);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const res = await fetch(`/api/user/${session?.user?.id}/projects`, {
                    method: 'GET',
                });
                const data = await res.json();
                setMainData(data);
            } catch (err) {
                console.error(err);
            }
        };
        if (session?.user?.id) {
            getProjects();
        }
    }, [session?.user?.id]);

    const currentProjects = mainData?.projects?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className={styles.recProjects}>
            <span className={styles.header}>Recent Activity</span>
            {currentProjects && currentProjects.length > 0 ? (
                <div className={styles.projectsContainer}>
                    <div className={styles.updatedAt}>
                        <span>Updated At</span>
                    </div>
                    {currentProjects.map((project) => (
                        <div
                            key={project.id}
                            className={styles.project}
                            onClick={() => router.push(`/project/${project.id}${project.shareId ? `?shareId=${project.shareId}` : ''}`)}
                        >
                            <div>
                                <span>
                                    {project.type === 'owner' ? 'You updated your project' : 'You collaborated on a project'}{' '}
                                    <span className={styles.projectName}>{project.name}</span>
                                </span>
                            </div>
                            <div>{new Date(project.updatedAt).toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <span>No Recent Activity Found...</span>
            )}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className={styles.pageButton}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span> Viewing page {currentPage} of {totalPages}</span>
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                        className={styles.pageButton}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecentActivity;