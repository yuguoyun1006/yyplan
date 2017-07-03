package com.ajx.supervise.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.CriteriaSpecification;

public class BaseDao {
	@Resource
	public SessionFactory sessionFactory;

	/**
	 * @param obj
	 *            添加数据
	 * @return
	 */
	public boolean addByEntity(Object obj) {
		Session session = null;
		Transaction tran = null;
		boolean result = false;
		try {
			session = this.sessionFactory.openSession();
			tran = session.beginTransaction();
			session.save(obj);
			tran.commit();
			result = true;
		} catch (Exception e) {
			e.printStackTrace();
			if (tran != null) {
				// 事物回滚
				tran.rollback();
			}
		} finally {
			if (session != null) {
				// 关闭session
				session.close();
			}
		}
		return result;
	}

	// 根据hql更新 result:1为成功，否则为失败
	public int updateBySql(String Sql, String[] param) {
		Session session = null;
		SQLQuery query = null;
		int result = 0;
		try {
			session = this.sessionFactory.openSession();
			query = session.createSQLQuery(Sql);
			if (param != null) {
				for (int i = 0; i < param.length; i++) {
					query.setString(i, param[i]);
				}
			}
			result = query.executeUpdate();
		} catch (Exception e) {
			// TODO: handle exception
		} finally {
			if (session != null) {
				// 关闭session
				session.close();
			}
		}
		return result;
	}

	// 返回map
	public List<Map<String, Object>> getListBySql(String sql, String[] param) {
		Session session = sessionFactory.openSession();
		SQLQuery query = session.createSQLQuery(sql);
		if (param != null) {
			for (int i = 0; i < param.length; i++) {
				query.setString(i, param[i]);
			}
		}
		query.setResultTransformer(CriteriaSpecification.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> list = query.list();
		if (session != null) {
			// 关闭session
			session.close();
		}
		return list;
	}

	// 返回list<entity>
	@SuppressWarnings("unchecked")
	public <T> List<T> getListEntityBySql(String sql, String[] param) {
		List<T> list = new ArrayList<T>();
		Session session = this.sessionFactory.openSession();
		SQLQuery query = session.createSQLQuery(sql);
		if (param != null) {
			for (int i = 0; i < param.length; i++) {
				query.setString(i, param[i]);
			}
		}
		list = query.list();
		if (session != null) {
			// 关闭session
			session.close();
		}
		return list;
	}

	/**
	 * @return 更新数据 参数为修改的主键id对象
	 */
	public boolean updateByEntity(Object object) {
		Session session = null;
		Transaction tran = null;
		boolean result = false;
		try {
			session = this.sessionFactory.openSession();
			tran = session.beginTransaction();
			session.update(object);
			tran.commit();
			result = true;
		} catch (Exception e) {
			if (tran != null) {
				// 事物回滚
				tran.rollback();
			}
		} finally {
			if (session != null) {
				// 关闭session
				session.close();
			}
		}
		return result;
	}

	/**
	 * @param c
	 * @param id
	 *            查询一条数据根据主键的id号
	 * @return
	 */
	public Object getEntityById(Class<?> c, String id) {
		Session session = null;
		Object object = null;
		try {
			session = this.sessionFactory.openSession();
			object = session.get(c, id);
		} catch (Exception e) {
		} finally {
			if (session != null) {
				// 关闭session
				session.close();
			}
		}
		return object;
	}

	/**
	 * @param obj
	 * @return 删除数据
	 */
	public boolean deleteByEntity(Object obj) {
		Session session = null;
		Transaction tran = null;
		boolean result = false;
		try {
			session = this.sessionFactory.openSession();
			tran = session.beginTransaction();
			session.delete(obj);
			tran.commit();
			result = true;
		} catch (Exception e) {
			if (tran != null) {
				// 事物回滚
				tran.rollback();
			}
		} finally {
			if (session != null) {
				// 关闭session
				session.close();
			}
		}
		return result;
	}

	/**
	 * @param obj
	 * @return 删除数据
	 */
	public boolean deleteById(Class<?> clazz, String id) {
		Object object = null;
		Session session = null;
		boolean result = false;
		try {
			session = this.sessionFactory.openSession();
			object = getEntityById(clazz, id);
			deleteByEntity(object);
			result = true;
		} catch (Exception e) {
		} finally {
			if (session != null) {
				// 关闭session
				session.close();
			}
		}
		return result;
	}

	/**
	 * @param <T>
	 *            查询多条记录
	 * @param sql
	 *            sql语句
	 * @param param
	 *            参数数组
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <T> List<T> queryListTableByHql(String sql, String[] param) {

		List<T> list = new ArrayList<T>();
		Session session = null;
		try {
			session = this.sessionFactory.openSession();
			Query query = session.createQuery(sql);
			if (param != null) {
				for (int i = 0; i < param.length; i++) {
					query.setString(i, param[i]);
				}
			}
			list = query.list();
		} catch (Exception e) {
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return list;
	}

	/**
	 * @param sql
	 * @param param
	 *            查询单条记录
	 * @return
	 */
	public Object queryOneByHql(String sql, String[] param) {
		Object object = null;
		Session session = null;
		try {
			session = this.sessionFactory.openSession();
			Query query = session.createQuery(sql);
			if (param != null) {
				for (int i = 0; i < param.length; i++) {
					query.setString(i, param[i]);
				}
				object = query.uniqueResult();
			}
		} catch (Exception e) {
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return object;
	}

	/**
	 * @param <T>
	 * @param sql
	 * @param param
	 * @param page
	 * @param size
	 * @return 实现分页查询
	 */
	@SuppressWarnings("unchecked")
	public <T> List<T> queryPageListBySql(String sql, String[] param, int page,
			int size) {
		List<T> list = new ArrayList<T>();
		Session session = null;
		try {
			session = this.sessionFactory.openSession();
			Query query = session.createQuery(sql);
			if (param != null) {
				for (int i = 0; i < param.length; i++) {
					query.setString(i, param[i]);
				}
			}
			// 筛选条数
			query.setFirstResult((page - 1) * size);
			query.setMaxResults(size);
			list = query.list();
		} catch (Exception e) {
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return list;
	}

	/**
	 * @param hql
	 * @param pras
	 * @return返回数据个数
	 */
	public int getCountByHql(String hql, String[] pras) {
		int resu = 0;
		Session s = null;
		try {
			s = this.sessionFactory.openSession();
			Query q = s.createQuery(hql);
			if (pras != null) {
				for (int i = 0; i < pras.length; i++) {
					q.setString(i, pras[i]);
				}
			}
			resu = Integer.valueOf(q.iterate().next().toString());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (s != null)
				s.close();
		}
		return resu;
	}

}