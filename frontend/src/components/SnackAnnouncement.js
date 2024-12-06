import React, { useState } from 'react';

function SnackAnnouncement() {
    const [snacks, setSnacks] = useState([]); // 用於儲存所有夜點項目
    const [newSnacks, setNewSnacks] = useState(''); // 用於追踪輸入的夜點名稱列表
    const [error, setError] = useState('');

    const handleAddSnacks = (e) => {
        e.preventDefault();

        // 驗證輸入是否為空
        if (!newSnacks.trim()) {
            setError('請輸入至少一個夜點名稱');
            return;
        }

        // 將輸入的夜點名稱按逗號分割
        const snacksToAdd = newSnacks
            .split(',')
            .map(snack => snack.trim()) // 去除空白
            .filter(snack => snack); // 避免空項目

        if (snacksToAdd.length === 0) {
            setError('請輸入有效的夜點名稱');
            return;
        }

        // 新增到現有夜點列表
        setSnacks([...snacks, ...snacksToAdd]);
        setNewSnacks(''); // 清空輸入框
        setError('');
    };

    const styles = {
        container: {
            marginTop: '20px',
            padding: '20px',
            maxWidth: '600px',
            margin: 'auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
        },
        formGroup: {
            marginBottom: '15px',
        },
        input: {
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            marginTop: '10px',
            padding: '10px 15px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#218838',
        },
        alert: {
            color: '#721c24',
            backgroundColor: '#f8d7da',
            padding: '10px',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            marginTop: '10px',
        },
        list: {
            listStyleType: 'none',
            paddingLeft: 0,
            marginTop: '15px',
        },
        listItem: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
    };

    return (
        <div style={styles.container}>
            <h2>新增夜點公告</h2>
            <form onSubmit={handleAddSnacks}>
                <div style={styles.formGroup}>
                    <label htmlFor="snackInput">夜點名稱（多個用逗號分隔）</label>
                    <input
                        type="text"
                        id="snackInput"
                        style={styles.input}
                        value={newSnacks}
                        onChange={(e) => setNewSnacks(e.target.value)}
                        placeholder="請輸入夜點名稱，例如：牛奶,三明治,薯片"
                    />
                </div>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    新增
                </button>
            </form>

            {error && <div style={styles.alert}>{error}</div>}

            <h3>夜點公告</h3>
            <ul style={styles.list}>
                {snacks.map((snack, index) => (
                    <li key={index} style={styles.listItem}>
                        {snack}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SnackAnnouncement;
